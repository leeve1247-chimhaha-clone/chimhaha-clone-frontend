import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const KEYCLOAK_BASE = "https://localhost:8090";
const REALM = "clone";
const CLIENT_ID = "localhost";

export const TEST_USERNAME = "e2e_test";
export const TEST_PASSWORD = "Test1234!";
export const TEST_EMAIL = "e2e_test@test.local";
export const TOKEN_CACHE_PATH = path.resolve(__dirname, ".auth/token-cache.json");

async function getAdminToken(): Promise<string> {
  const params = new URLSearchParams({
    grant_type: "password",
    client_id: "admin-cli",
    username: "admin",
    password: "admin",
  });
  const res = await fetch(`${KEYCLOAK_BASE}/realms/master/protocol/openid-connect/token`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: params.toString(),
  });
  if (!res.ok) throw new Error(`Admin token failed: ${res.status} ${await res.text()}`);
  const data = await res.json() as { access_token: string };
  return data.access_token;
}

async function getClientId(adminToken: string): Promise<string> {
  const res = await fetch(
    `${KEYCLOAK_BASE}/admin/realms/${REALM}/clients?clientId=${CLIENT_ID}&search=true`,
    { headers: { Authorization: `Bearer ${adminToken}` } }
  );
  if (!res.ok) throw new Error(`Client lookup failed: ${res.status}`);
  const clients = await res.json() as Array<{ id: string; clientId: string }>;
  const match = clients.find((c) => c.clientId === CLIENT_ID);
  if (!match) throw new Error(`Client '${CLIENT_ID}' not found in realm '${REALM}'`);
  return match.id;
}

async function enableDirectAccessGrants(adminToken: string, clientUuid: string): Promise<void> {
  const getRes = await fetch(`${KEYCLOAK_BASE}/admin/realms/${REALM}/clients/${clientUuid}`, {
    headers: { Authorization: `Bearer ${adminToken}` },
  });
  if (!getRes.ok) throw new Error(`Get client failed: ${getRes.status}`);
  const client = await getRes.json() as Record<string, unknown>;

  if (client.directAccessGrantsEnabled === true) return; // already enabled

  client.directAccessGrantsEnabled = true;
  const putRes = await fetch(`${KEYCLOAK_BASE}/admin/realms/${REALM}/clients/${clientUuid}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${adminToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(client),
  });
  if (!putRes.ok) throw new Error(`Enable direct grants failed: ${putRes.status}`);
  console.log("[global-setup] Direct Access Grants 활성화 완료.");
}

async function userExists(adminToken: string): Promise<boolean> {
  const res = await fetch(
    `${KEYCLOAK_BASE}/admin/realms/${REALM}/users?username=${TEST_USERNAME}&exact=true`,
    { headers: { Authorization: `Bearer ${adminToken}` } }
  );
  if (!res.ok) throw new Error(`User lookup failed: ${res.status}`);
  const users = await res.json() as unknown[];
  return users.length > 0;
}

async function createUser(adminToken: string): Promise<void> {
  const res = await fetch(`${KEYCLOAK_BASE}/admin/realms/${REALM}/users`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${adminToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: TEST_USERNAME,
      email: TEST_EMAIL,
      enabled: true,
      emailVerified: true,
      credentials: [{ type: "password", value: TEST_PASSWORD, temporary: false }],
    }),
  });
  if (!res.ok) throw new Error(`User creation failed: ${res.status} ${await res.text()}`);
}

export interface TokenResponse {
  access_token: string;
  refresh_token: string;
  id_token: string;
  token_type: string;
  expires_in: number;
  scope: string;
  session_state: string;
}

async function fetchTestUserToken(): Promise<TokenResponse> {
  const params = new URLSearchParams({
    grant_type: "password",
    client_id: CLIENT_ID,
    username: TEST_USERNAME,
    password: TEST_PASSWORD,
    scope: "openid",
  });
  const res = await fetch(`${KEYCLOAK_BASE}/realms/${REALM}/protocol/openid-connect/token`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: params.toString(),
  });
  if (!res.ok) throw new Error(`Test user token failed: ${res.status} ${await res.text()}`);
  return res.json() as Promise<TokenResponse>;
}

export default async function globalSetup() {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

  console.log("[global-setup] Keycloak 테스트 계정 및 클라이언트 설정 중...");

  const adminToken = await getAdminToken();
  const clientUuid = await getClientId(adminToken);
  await enableDirectAccessGrants(adminToken, clientUuid);

  const exists = await userExists(adminToken);
  if (!exists) {
    await createUser(adminToken);
    console.log(`[global-setup] 계정 '${TEST_USERNAME}' 생성 완료.`);
  } else {
    console.log(`[global-setup] 계정 '${TEST_USERNAME}' 이미 존재. 건너뜀.`);
  }

  // 테스트 토큰 미리 발급 → auth.setup.ts 에서 sessionStorage 주입에 사용
  const token = await fetchTestUserToken();
  fs.mkdirSync(path.dirname(TOKEN_CACHE_PATH), { recursive: true });
  fs.writeFileSync(TOKEN_CACHE_PATH, JSON.stringify(token, null, 2));
  console.log("[global-setup] 테스트 토큰 캐시 저장 완료.");
}
