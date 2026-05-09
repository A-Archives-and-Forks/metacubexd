import type { VNode } from 'vue'
import { h } from 'vue'

const NBSP = ' '

/**
 * Render a two-line table cell with a primary (strong) line and an
 * auxiliary (softer) line. When aux is null/empty, a nbsp placeholder
 * preserves the equal-height row layout.
 */
export function renderTwoLineCell(
  primary: string,
  aux: string | null | undefined,
): VNode {
  return h('div', { class: 'conn-cell-stack' }, [
    h('div', { class: 'conn-primary' }, primary),
    h('div', { class: 'conn-aux' }, aux || NBSP),
  ])
}
