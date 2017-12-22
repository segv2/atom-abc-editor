'use babel'

import { CompositeDisposable } from 'atom'

console.log('Loading module')

export default {

  subscriptions: null,

  activate(state) {
    console.log('Activating!')
    this.subscriptions = new CompositeDisposable()

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'atom-abc-editor:hello': () => this.hello()
    }))
  },

  deactivate() {
    this.subscriptions.dispose()
  },

  hello() {
    //console.log('Hello World!')
    let editor
    if (editor = atom.workspace.getActiveTextEditor()) {
      let selection = editor.getSelectedText()
      console.log(selection)
    }
  }
}
