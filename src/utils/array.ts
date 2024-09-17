/**
 * Convert the given array to a tree -shaped structure.
 * @param arr - The original array, each of which contains ID and PID attributes, PID represents the parent -level ID.
 * @returns Return to the shifted tree structure array.
 */
export function arrayToTree(arr: any[]) {
  // Initialization result array
  const res: any = []
  // Use MAP to store array elements, use ID as the key, and the element itself is the value
  const map = new Map()

  // Traversing the array, store each element with the ID as the key to the MAP
  arr.forEach((item) => {
    map.set(item.id, item)
  })

  // Travel all over the array again, and organize the element into a tree -shaped structure according to PID
  arr.forEach((item) => {
    // Parent -level elements that obtain the current element
    const parent = item.pid && map.get(item.pid)
    // If there is a parent -level element
    if (parent) {
      // If the parent element already has sub -elements, the current element is added to the sub -element array
      if (parent?.children)
        parent.children.push(item)
      // If the parent element does not have sub -elements, create a sub -element array, and use the current element as the first element
      else
        parent.children = [item]
    }
    // If there is no parent element, add the current element directly to the result array
    else {
      res.push(item)
    }
  })
  // Return to the organization of the tissue -shaped structure
  return res
}
