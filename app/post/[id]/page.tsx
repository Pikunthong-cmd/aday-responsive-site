import { postsAPI } from "@/src/api/posts";

type Props = {
  params: { id: string };
};

export default async function PostPage({ params }: Props) {
  const postId = Number(params.id);

  if (!Number.isFinite(postId)) {
    return <div className="p-6">Invalid id</div>;
  }

  const post = await postsAPI.getPostSlug(postId);

  if (!post) {
    return <div className="p-6">Post not found</div>;
  }

  return (
    <main className="max-w-3xl mx-auto px-6 py-12">
      <h1
        className="text-3xl font-semibold"
        dangerouslySetInnerHTML={{ __html: post.title?.rendered || "" }}
      />

      <div
        className="prose mt-8"
        dangerouslySetInnerHTML={{ __html: post.content?.rendered || "" }}
      />
    </main>
  );
}
