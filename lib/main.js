'use babel'

import { CompositeDisposable } from 'atom'
import AbcEditor from './editor'

// Main package handler.
// Associates any current and future ABC TextEditor with an AbcEditor
export default {

  subscriptions: null,

  activate (state) {

    this.subscriptions = new CompositeDisposable()

    // Register command that toggles this view
    //this.subscriptions.add(atom.commands.add('atom-workspace', {
    //  'atom-abc-editor:hello': () => this.hello()
    //}))

    // look for any new text editors, and attach an AbcEditor to
    // the ones with a matching grammar
    this.subscriptions.add(
      atom.workspace.observeTextEditors(editor => {
        if (editor.getGrammar().scopeName == 'text.abcnotation') {
          new AbcEditor(editor)
        }
    }))
  },

  deactivate () {
    this.subscriptions.dispose()
  }
}
