import type { NextPage } from "next";
import Tree from "../avl-tree/tree";
import { Node } from "../avl-tree/node";

import styles from "../styles/Home.module.css";
const letters = ["e", "l", "i", "a", "s", "r", "n", "g", "j"];
const Home: NextPage = () => {
  const tree = new Tree<string, any>();
  letters.forEach((e) => tree.insert(e));

  const render = (root: Node<any, any> | null) => {
    if (!root) {
      return;
    }
    console.log(root);
    return (
      <ul>
        <li>
          <>
            <a>{root.key}</a>
            {(root.left !== null || root.right !== null) && (
              <ul>
                {root.left && (
                  <li>
                    <ul>{render(root.left)}</ul>
                  </li>
                )}
                {root.right && (
                  <li>
                    <ul>{render(root.right)}</ul>
                  </li>
                )}
              </ul>
            )}
          </>
        </li>
      </ul>
    );
  };
  return (
    <div className={styles.container}>
      <div className="tree">{render(tree.getRoot())}</div>
    </div>
  );
};

export default Home;
