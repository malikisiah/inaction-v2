import { defaultProps } from "@blocknote/core";
import { createReactBlockSpec } from "@blocknote/react";

export const Title = createReactBlockSpec(
  {
    type: "title",
    propSchema: {
      textAlignment: defaultProps.textAlignment,
      textColor: defaultProps.textColor,
    },

    content: "inline",
  },
  {
    render: (props) => {
      return (
        <div
          className="flex-grow text-center text-7xl font-bold"
          ref={props.contentRef}
        ></div>
      );
    },
  },
);

export const Act = createReactBlockSpec(
  {
    type: "act",
    propSchema: {
      textAlignment: defaultProps.textAlignment,
      textColor: defaultProps.textColor,
    },

    content: "inline",
  },
  {
    render: (props) => {
      return (
        <div
          className="flex-grow text-center text-5xl font-bold"
          ref={props.contentRef}
        ></div>
      );
    },
  },
);

export const Scene = createReactBlockSpec(
  {
    type: "scene",
    propSchema: {
      textAlignment: defaultProps.textAlignment,
      textColor: defaultProps.textColor,
    },
    content: "inline",
  },
  {
    render: (props) => {
      return (
        <div
          className="flex-grow text-center text-3xl font-bold"
          ref={props.contentRef}
        ></div>
      );
    },
  },
);

export const Dialogue = createReactBlockSpec(
  {
    type: "dialogue",
    propSchema: {
      textAlignment: defaultProps.textAlignment,
      textColor: defaultProps.textColor,
    },
    content: "inline",
  },
  {
    render: (props) => {
      return <div className="flex-grow text-xl" ref={props.contentRef}></div>;
    },
  },
);
