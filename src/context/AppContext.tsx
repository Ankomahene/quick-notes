import { Link } from '@mantine/tiptap';
import Highlight from '@tiptap/extension-highlight';
import SubScript from '@tiptap/extension-subscript';
import Superscript from '@tiptap/extension-superscript';
import TextAlign from '@tiptap/extension-text-align';
import Underline from '@tiptap/extension-underline';
import { Editor, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { ReactNode, createContext } from 'react';
import { IUser, LayoutType } from '../types';
import { useLocalStorage } from '@mantine/hooks';

interface IAppContext {
  user: IUser | null;
  page: number;
  editor: Editor | null;
  noteId: string;
  noteTitle: string;
  layoutType: LayoutType;
  setUser: (user: IUser | null) => void;
  setNoteId: (id: string) => void;
  setNoteTitle: (value: string) => void;
  setPage: (value: number) => void;
  setNoteContent: (content: string) => void;
  setLayoutType: (content: LayoutType) => void;
}

export const AppContext = createContext<IAppContext | null>(null);

export const AppContextProvider = ({ children }: { children: ReactNode }) => {
  const [noteTitle, setNoteTitle] = useLocalStorage<string>({
    key: 'quick_note_current_note_title',
    defaultValue: 'Untitled Note',
  });
  const [noteId, setNoteId] = useLocalStorage<string>({
    key: 'quick_note_current_note_id',
    defaultValue: '',
  });
  const [page, setPage] = useLocalStorage<number>({
    key: 'quick_note_current_page',
    defaultValue: 0,
  });
  const [layoutType, setLayoutType] = useLocalStorage<LayoutType>({
    key: 'quick_note_current_layout',
    defaultValue: 'list',
  });
  const [user, setUser] = useLocalStorage<IUser | null>({
    key: 'quick_note_current_user',
    defaultValue: null,
  });

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link,
      Superscript,
      SubScript,
      Highlight,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
    ],
    content: '',
  });

  return (
    <AppContext.Provider
      value={{
        editor,
        user,
        noteTitle,
        setNoteTitle,
        noteId,
        setNoteId,
        page,
        setUser,
        setPage,
        setNoteContent: (content: string) =>
          editor?.commands.setContent(content),
        layoutType,
        setLayoutType,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
