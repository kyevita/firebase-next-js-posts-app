import PostFeed from "../../components/PostFeed";
import UserProfile from "../../components/UserProfile";
import { GetServerSideProps } from "next";
import { getUserByUsername } from "../../models/users";
import { getPostsByUserDoc } from "../../models/posts";

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { username } = query;
  const userDoc = await getUserByUsername(username as string);

  if (!userDoc) {
    return {
      notFound: true,
    };
  }

  const user = userDoc.data();
  const posts = await getPostsByUserDoc(userDoc, {
    where: [["published", "==", true]],
    orderBy: ["createdAt", "desc"],
    limit: 5,
  });

  return {
    props: {
      user,
      posts,
    },
  };
};

export default function UserProfilePage({ user, posts }) {
  return (
    <main>
      <UserProfile user={user} />
      <PostFeed posts={posts} />
    </main>
  );
}
