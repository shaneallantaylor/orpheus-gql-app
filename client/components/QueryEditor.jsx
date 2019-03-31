import React from 'react';
import { render } from 'react-dom';
import MonacoEditor from 'react-monaco-editor';


class QueryEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      code: '',
    }
  }
  editorDidMount(editor, monaco) {
    // console.log('editorDidMount', editor);
    // editor.focus();
    <MonacoEditor ref="monaco" />
  }
  onChange(newValue, e) {
    // console.log('onChange', newValue, e);
  }
  render() {

    return (
      <MonacoEditor
        height="100"
        language="javascript"
        theme="vs-light"
        value={this.state.code}
        options={{ language: "javascript", minimap: { enabled: false }, showUnused: true, wordWrap: "on", autoIndent: true, fontSize: 16, formatOnPaste: true, formatOnType: true }}
        onChange={this.onChange}
        editorDidMount={this.editorDidMount}
      />
    );
  }
}

export default QueryEditor
