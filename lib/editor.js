'use babel'

import { CompositeDisposable } from 'atom'

// class manages an ABC TextEditor
export default class AbcEditor {

  //config = require('./config')
  subscriptions = new CompositeDisposable()
  marker = null
  editor =  null
  position = null

  constructor(editor) {
    this.editor = editor
    this.setNewRow(editor.getCursorBufferPosition().row)
    this.subscriptions.add(
      editor.onDidChangeCursorPosition(e => this.cursorChange(e)))
  }

  cursorChange(event) {
    if (event.oldBufferPosition.row != event.newBufferPosition.row) {
      this.setNewRow(event.newBufferPosition.row)
    }
  }

  setNewRow(rowIndex) {

    if (!this.editor.lineTextForBufferRow(rowIndex)) {
      this.clearPosition()
    } else {
      let pos = { first: rowIndex, last: rowIndex }
      while (pos.first > 0 && this.editor.lineTextForBufferRow(pos.first - 1)) {
        -- pos.first;
      }
      while (pos.last < this.editor.getLastBufferRow()
        && this.editor.lineTextForBufferRow(pos.last + 1)) {
        ++ pos.last;
      }
      this.setNewPosition(pos)
    }
  }

  clearPosition() {
    this.position = null
    if (this.marker) {
      this.marker.destroy()
      this.marker = null
    }
  }

  setNewPosition(pos) {
    if (this.position && this.position.first == pos.first && this.position.last == pos.last) {
      // the old and the new position are the same, do nothing
    } else {
      this.clearPosition()
      if (true) {
        let m = this.editor.markBufferRange([[pos.first, 0], [pos.last, 80]], {invalidate: 'never'})
        this.editor.decorateMarker(m, {type: 'line', class: 'current-tune'})
        this.marker = m
      } else {
        console.log(pos)
      }
      this.position = pos
    }
  }
}
