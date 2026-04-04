import { useState } from 'react'
import type { PatternCell } from '../../utils/pattern'
import { buildPatternGrid } from '../../utils/pattern'

type PatternEditorProps = {
  initial?: string
}

export function PatternEditor({ initial = '' }: PatternEditorProps) {
  const [patternText, setPatternText] = useState(initial)
  const rows = patternText.split('\n').filter((line) => line.trim().length > 0)
  const previewGrid: PatternCell[][] = buildPatternGrid(rows.length ? rows : [''])

  return (
    <div className="editor-card">
      <textarea
        className="pattern-input"
        value={patternText}
        placeholder="Paste or type a chart (use . for empty stitches)"
        onChange={(event) => setPatternText(event.target.value)}
      />
      <div style={{ marginTop: '1rem' }}>
        <strong>Preview</strong>
        <PatternPreview rows={previewGrid} />
      </div>
    </div>
  )
}

const PatternPreview = ({ rows }: { rows: PatternCell[][] }) => (
  <div className="pattern-grid" style={{ marginTop: '0.5rem' }}>
    {rows.map((row, rowIndex) => (
      <div className="pattern-row" key={`preview-${rowIndex}`}>
        {row.map((cell) => (
          <div className="pattern-cell" key={`preview-${rowIndex}-${cell.column}`}>
            {cell.symbol || '·'}
          </div>
        ))}
      </div>
    ))}
  </div>
)
