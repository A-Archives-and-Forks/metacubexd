import type { VNode } from 'vue'
import { describe, expect, it } from 'vitest'
import { renderTwoLineCell } from '../connectionCells'

function findChildByClass(vnode: VNode, cls: string): VNode | null {
  if (
    typeof vnode.props?.class === 'string' &&
    vnode.props.class.split(/\s+/).includes(cls)
  ) {
    return vnode
  }
  if (Array.isArray(vnode.children)) {
    for (const child of vnode.children) {
      if (typeof child === 'object' && child !== null && 'type' in child) {
        const found = findChildByClass(child as VNode, cls)
        if (found) return found
      }
    }
  }
  return null
}

describe('renderTwoLineCell', () => {
  it('renders a stack with primary and aux children', () => {
    const vnode = renderTwoLineCell('example.com:443', 'my-app · /usr/bin/curl')

    expect(vnode.type).toBe('div')
    expect(vnode.props?.class).toBe('conn-cell-stack')
    expect(findChildByClass(vnode, 'conn-primary')?.children).toBe(
      'example.com:443',
    )
    expect(findChildByClass(vnode, 'conn-aux')?.children).toBe(
      'my-app · /usr/bin/curl',
    )
  })

  it('falls back to nbsp when aux is null (preserves equal-height rows)', () => {
    const vnode = renderTwoLineCell('example.com:443', null)

    expect(findChildByClass(vnode, 'conn-aux')?.children).toBe(' ')
  })

  it('falls back to nbsp when aux is an empty string', () => {
    const vnode = renderTwoLineCell('example.com:443', '')

    expect(findChildByClass(vnode, 'conn-aux')?.children).toBe(' ')
  })
})
