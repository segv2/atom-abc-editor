'use babel'

import { CompositeDisposable } from 'atom'
import AbcEditor from './editor'

// Main package handler.
// Associates any current and future ABC TextEditor with an AbcEditor
class Main {

  config = require('./config')
  subscriptions = null

  activate (state) {

    this.subscriptions = new CompositeDisposable()

    // look for any new text editors, and attach an AbcEditor to
    // the ones with a matching grammar
    this.subscriptions.add (
      atom.workspace.observeTextEditors(editor => {
        if (editor.getGrammar().scopeName == 'text.abcnotation') {
          new AbcEditor(editor)
        }
    }))

    this.subscriptions.add (
      atom.commands.add (
        'atom-text-editor',
        'atom-abc-editor:addView',
        this.addView
    ))

    this.subscriptions.add (
      atom.commands.add (
        'atom-text-editor',
        'atom-abc-editor:removeView',
        this.removeView
    ))
  }

  deactivate () {
    this.subscriptions.dispose()
  }

  addView (event) {
    console.log(event)
  }

  removeView (event) {
    console.log(event)
  }
}

module.exports = new Main()
