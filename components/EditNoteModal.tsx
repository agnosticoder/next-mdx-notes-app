import {Dialog, Transition} from '@headlessui/react';
import { MouseEvent, useEffect, useRef, useState } from 'react';
import getTodo from '../lib/getTodo';
import styles from '../styles/modules/EditNoteModal.module.scss';
import { useUpdateTodo } from './store/todoStore';
import { Todo } from './TodoItem';
import {useRouter} from 'next/router';

interface EditNoteModalProps {
    isOpenModal: boolean,
    onClose: () => void,
    todo: Todo
}

const EditNoteModal = ({ isOpenModal, onClose, todo }: EditNoteModalProps) => {
    const [noteUpdate, setNoteUpdate] = useState<string>('');
    const ref = useRef<HTMLTextAreaElement>(null);
    const updateTodo = useUpdateTodo();
    const router = useRouter();

    const update = { isDone: todo.isDone, content: noteUpdate };
    const { createdAt } = todo;

    const onUpdateNote = async (e: MouseEvent) => {
        e.preventDefault();
        const res = await updateTodo({ update, createdAt });
        console.log(await res?.json());
        if (res?.status === 200) {
            router.replace(router.asPath);
        }
        onClose();
    };

    useEffect(() => {
        (async function () {
            const res = await getTodo(todo.createdAt);
            if (!res) return;
            const { content } = res;
            setNoteUpdate(content);
        })();
    }, [todo.createdAt]);

    //todo: scroll to the end when focus, research how this works?
    //todo: put the cursor to the end word
    //todo: confirm if they want to make changes
    //? provide draft facility
    // useEffect(() => {
    //     if(!ref.current) return;
    //     ref.current.focus();
    //     // ref.current.scrollTop = ref.current.scrollHeight;
    // }, [ref])

    return (
        <div>
            {/* //todo: add animation using any libarary */}
                <Dialog className={styles.dialog} onClose={onClose} open={isOpenModal}>
                    <Dialog.Overlay className={styles.overlay} />
                    <div className={styles.container}>
                        <Dialog.Title className={styles.title}>Make Changes</Dialog.Title>
                        <Dialog.Description className={styles.description}>
                            Caution, changes will be overwrite the previous content
                        </Dialog.Description>
                        <textarea
                            ref={ref}
                            className={styles.textarea}
                            value={noteUpdate}
                            onChange={(e) => setNoteUpdate(e.currentTarget.value)}
                        />
                        <div className={styles.buttons}>
                            <button onClick={onUpdateNote}>Update</button>
                            <button onClick={onClose}>Close</button>
                        </div>
                    </div>
                </Dialog>
        </div>
    );
};

export default EditNoteModal;
