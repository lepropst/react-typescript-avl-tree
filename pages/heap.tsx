import { useEffect } from "react";

import { MaxHeap } from "../heap/heap";
export default function Heap() {
  const heap = new MaxHeap();
  const letters = ["e", "l", "i", "a", "s", "r", "n", "g", "j"];
  useEffect(() => {
    setTimeout(() => {}, 100);
    letters.forEach((e) => heap.add(e));
    console.log("==========================");
    heap.print();
    console.log("=========================================");
    heap.extractMax();
    heap.extractMax();
    heap.extractMax();
  }, []);
  return (
    <>
      <div></div>
    </>
  );
}
