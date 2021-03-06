import { useRouter } from 'next/router';
import EditPostForm from '../../../../components/EditPostForm';
import { trpc } from '../../../../utils/trpc';

const EditPost = () => {
    const router = useRouter();
    const { id } = router.query as { id: string };
    const {data: post, isSuccess} = trpc.useQuery(['post.get', { postId: id }],{
        enabled: !!id,
    });

    const prefill = {id, title: post?.title, content: post?.content};

    return (
        <div>
            {isSuccess && <EditPostForm {...prefill}/>}
        </div>
    );
};

export default EditPost;