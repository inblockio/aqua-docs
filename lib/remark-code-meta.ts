/**
 * Remark plugin to extract code block meta strings and pass them as props
 * Converts: ```js filename.js
 * Into props: { language: 'js', meta: 'filename.js' }
 */
export function remarkCodeMeta() {
  return (tree: any) => {
    const visit = (node: any) => {
      if (node.type === 'code' && node.meta) {
        // Store the meta string in the node's data
        node.data = node.data || {}
        node.data.hProperties = node.data.hProperties || {}
        node.data.hProperties.meta = node.meta
      }
      
      if (node.children) {
        node.children.forEach(visit)
      }
    }
    
    visit(tree)
  }
}
