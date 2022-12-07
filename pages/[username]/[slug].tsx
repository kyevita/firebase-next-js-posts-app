import styles from "../../styles/Post.module.css";
import PostContent from "../../components/PostContent";
import { GetStaticProps, GetStaticPaths } from "next";
import { firestore } from "../../lib/firebase";
import { getPostByIdByUserDoc, getPosts } from "../../models/posts";
import { getUserByUsername } from "../../models/users";
import { useDocumentData } from "react-firebase-hooks/firestore";

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { username, slug } = params;
  const userDoc = await getUserByUsername(username as string);

  let post = null;
  let path = null;

  if (userDoc) {
    post = await getPostByIdByUserDoc(slug as string, userDoc);
    path = post._path;
  }

  return {
    props: { post, path },
    revalidate: 5000,
  };
};

export const getStaticPaths: GetStaticPaths = async (ctx) => {
  const snapshot = await getPosts();
  const paths = snapshot.map((doc) => ({
    params: { username: doc.username, slug: doc.slug },
  }));

  return {
    paths,
    fallback: "blocking",
  };
};

export default function Post(props) {
  const postRef = firestore.doc(props.path);
  const [realtimePost] = useDocumentData(postRef as any);

  const post = realtimePost || props.post;

  return (
    <main className={styles.container}>
      <section>
        <PostContent post={post} />
      </section>

      <aside className="card">
        <p>
          <strong>{post.heartCount || 0} 🤍</strong>
        </p>
      </aside>
    </main>
  );
}
