import type { NextPage } from "next";
import Tree from "../avl-tree/tree";
import { Node } from "../avl-tree/node";

import styles from "../styles/Home.module.css";
import { ReactNode, useCallback, useEffect, useMemo, useState } from "react";
const Render = ({ root }: { root: Node<any, any> | null }) => {
  if (!root) {
    return <></>;
  }
  return (
    <ul>
      <li>
        <>
          <a>{root.key}</a>
          {(root.left !== null || root.right !== null) && (
            <ul>
              {root.left && (
                <li>
                  <ul>
                    <Render root={root.left} />
                  </ul>
                </li>
              )}
              {root.right && (
                <li>
                  <ul>
                    <Render root={root.right} />
                  </ul>
                </li>
              )}
            </ul>
          )}
        </>
      </li>
    </ul>
  );
};

const Home: NextPage = () => {
  const [userLetters, setUserLetters] = useState<string[]>([]);

  const [trees, setTrees] = useState<{ tree: Tree<any, any> }[]>(() => []);
  const [unorderedTrees, unorderedSetTrees] = useState<
    { tree: Tree<any, any> }[]
  >([]);

  const [historys, setHistorys] = useState<
    { message1: string; message2: string }[]
  >([]);
  const build = useCallback(
    (letters: string[]) => {
      if (letters.length > 0) {
        letters.forEach((e, i) => {
          const length = i + 1;
          // letters.indexOf(e) === letters.length
          //   ? letters.indexOf(e)
          //   : letters.indexOf(e) + 1;
          const set1 = letters.slice(0, length);
          const currentTree = trees[letters.indexOf(e)];
          const unorderedCurrentTree = unorderedTrees[letters.indexOf(e)];
          const historyMessage1 = set1.map((e) => currentTree.tree.insert(e));
          const historyMessage2 = set1.map((e) =>
            unorderedCurrentTree.tree.insert(e, e, true)
          );
          console.log("history message", historyMessage1);
          setHistorys([
            ...historys,
            {
              message1: historyMessage1.join("\n"),
              message2: historyMessage2.join("\n"),
            },
          ]);
        });
      }
    },
    [userLetters, unorderedTrees, trees]
  );
  useEffect(() => {
    build(userLetters);
  }, [userLetters, build]);

  return (
    <>
      <div className="header">
        <div>
          {userLetters.map((e, i) => {
            return (
              <button
                key={`${e}-${i}`}
                onClick={(ev) => {
                  ev.preventDefault();
                  console.log(userLetters);
                  const tmp = [];
                  for (let j = 0; j < userLetters.length; j++) {
                    if (i !== j) {
                      tmp.push(userLetters[j]);
                    }
                    console.log(j, i);
                    if (j === i) continue;
                  }
                  console.log(tmp);
                  setUserLetters(tmp);
                }}
              >
                {e}
              </button>
            );
          })}
        </div>
        <div>
          <h4>
            Please creeate an array by inputing letters into the input below.
            Clicking on any letter will remove it from the array.
          </h4>
        </div>
        <div className="single-letter">
          <label>Single letter input</label>
          <input
            type={"text"}
            onChange={(e) => {
              setUserLetters([...userLetters, e.target.value]);
              setTrees([...trees, { tree: new Tree() }]);
              unorderedSetTrees([...unorderedTrees, { tree: new Tree() }]);
              e.target.value = "";
            }}
          ></input>
        </div>
      </div>
      <div className={styles.container}>
        {userLetters.map((e, i) => {
          return (
            <div key={`${e}-${i}`} className="tree-container">
              <div className="label">{i + 1} letters</div>
              <div style={{ display: "flex" }}>
                <div>
                  <span>Ordered</span>
                  <div style={{ whiteSpace: "pre-wrap" }}>
                    {historys[i] && historys[i].message1}
                  </div>

                  <div key={`${i}`} className="tree">
                    {trees[i] && trees[i].tree && (
                      <Render root={trees[i].tree.getRoot()} />
                    )}
                  </div>
                </div>
                <div>
                  <span>unordered</span>
                  <div style={{ whiteSpace: "pre-wrap" }}>
                    {historys[i] && historys[i].message2}
                  </div>

                  <div key={`${i}`} className="tree">
                    {trees[i] && trees[i].tree && (
                      <Render root={unorderedTrees[i].tree.getRoot()} />
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Home;
