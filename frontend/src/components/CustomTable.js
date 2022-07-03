import React, { Component } from "react";
import PropTypes from "prop-types";
import { EditorState, Modifier, ContentState, convertFromHTML } from "draft-js";

export default class CustomTable extends Component {
  static propTypes = {
    onChange: PropTypes.func,
    editorState: PropTypes.object,
  };

  addTable = () => {
    let { editorState, onChange } = this.props;
    let contentState;
    // contentState = Modifier.replaceText(
    //   editorState.getCurrentContent(),
    //   editorState.getSelection(),
    //   "TTT",
    //   editorState.getCurrentInlineStyle()
    // );

    let html = `<table>
        <tr>
          <td><strong>A1</strong></td>
          <td><em>B1</em></td>
        </tr>
        <tr>
          <td>A2</td>
          <td>B2</td>
        </tr>
      </table>`;

    // const blocksFromHTML = htmlToDraft(html);
    const blocksFromHTML = convertFromHTML(html);
    const { contentBlocks, entityMap } = blocksFromHTML;
    contentState = ContentState.createFromBlockArray(contentBlocks, entityMap);

    contentState = Modifier.replaceWithFragment(
      editorState.getCurrentContent(),
      editorState.getSelection(),
      contentState.getBlockMap()
    );

    onChange(EditorState.push(editorState, contentState, "insert-characters"));
  };

  render() {
    return (
      <div
        className='rdw-option-wrapper'
        aria-selected='false'
        title='Table'
        onClick={this.addTable}>
        T
      </div>
    );
  }
}
