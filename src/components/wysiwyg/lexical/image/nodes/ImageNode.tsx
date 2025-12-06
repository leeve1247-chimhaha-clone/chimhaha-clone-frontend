import type {DOMConversionMap, DOMExportOutput} from "lexical";
import {DecoratorNode} from "lexical";
import {type JSX, Suspense} from "react";
import style from "./ImageNode.module.css";
import type {ImagePayload} from "./ImagePayload.tsx";
import {convertImageElement} from "./utils.tsx";
import {LazyImageComponent} from "../components/imageComponent/LazyImageComponent.tsx";
import type {SerializedImageNode} from "./SerializedImageNode.tsx";

export class ImageNode extends DecoratorNode<JSX.Element> {
  __src: string;
  __altText: string;
  __width: "inherit" | number;
  __height: "inherit" | number;
  __maxWidth: number;

  constructor({src, altText, maxWidth, width, height, key}: ImagePayload) {
    super(key);
    this.__src = src;
    this.__altText = altText;
    this.__maxWidth = maxWidth == undefined ? 500 : maxWidth;
    this.__width = width || "inherit";
    this.__height = height || "inherit";
  }

  override decorate(): JSX.Element {
    return (
      <Suspense fallback={null}>
        <LazyImageComponent
          src={this.__src}
          altText={this.__altText}
          width={this.__width}
          height={this.__height}
          maxWidth={this.__maxWidth}
          nodeKey={this.getKey()}
          resizable={true}
        />
      </Suspense>
    );
  }

  static override clone(node: ImageNode): ImageNode {
    return new ImageNode({
        src: node.__src,
        altText: node.__altText,
        maxWidth: node.__maxWidth,
        width: node.__width,
        height: node.__height,
        key: node.__key
      }
    );
  }

  static override importJSON(serializedNode: SerializedImageNode): ImageNode {
    const {altText, height, width, maxWidth, src} = serializedNode;
    return new ImageNode({altText, height, width, maxWidth, src}).updateFromJSON(serializedNode);
  }

  override createDOM(): HTMLElement {
    const span = document.createElement("span");
    const className = style.editorImage;
    if (className !== undefined) {
      span.className = className;
    }
    return span;
  }

  override updateDOM(): false {
    return false;
  }

  static override importDOM(): DOMConversionMap | null {
    return {
      img: () => ({
        conversion: convertImageElement,
        priority: 0
      })
    };
  }

  override exportJSON(): SerializedImageNode {
    return {
      altText: this.getAltText(),
      height: this.__height === "inherit" ? 0 : this.__height,
      maxWidth: this.__maxWidth,
      src: this.getSrc(),
      type: "image",
      version: 1,
      width: this.__width === "inherit" ? 0 : this.__width
    };
  }

  override exportDOM(): DOMExportOutput {
    const element = document.createElement("img");
    element.setAttribute("src", this.__src);
    element.setAttribute("alt", this.__altText);
    return {element};
  }

  static override getType(): string {
    return "image";
  }

  setWidthAndHeight(
    width: "inherit" | number,
    height: "inherit" | number
  ): void {
    const writable = this.getWritable();
    writable.__width = width;
    writable.__height = height;
  }

  getSrc(): string {
    return this.__src;
  }

  getAltText(): string {
    return this.__altText;
  }
}

