import { Link } from '@mantine/tiptap';
import Highlight from '@tiptap/extension-highlight';
import SubScript from '@tiptap/extension-subscript';
import Superscript from '@tiptap/extension-superscript';
import TextAlign from '@tiptap/extension-text-align';
import Underline from '@tiptap/extension-underline';
import { Editor, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { ReactNode, createContext, useState } from 'react';
import { LayoutType } from '../types';

interface IAppContext {
  page: number;
  editor: Editor | null;
  noteId: string;
  noteTitle: string;
  layoutType: LayoutType;
  setNoteId: (id: string) => void;
  setNoteTitle: (value: string) => void;
  setPage: (value: number) => void;
  setNoteContent: (content: string) => void;
  setLayoutType: (content: LayoutType) => void;
}

export const AppContext = createContext<IAppContext | null>(null);

export const AppContextProvider = ({ children }: { children: ReactNode }) => {
  const [noteTitle, setNoteTitle] = useState<string>('Untitled Note');
  const [noteId, setNoteId] = useState<string>('');
  const [page, setPage] = useState<number>(1);
  const [layoutType, setLayoutType] = useState<LayoutType>('list');

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
        noteTitle,
        setNoteTitle,
        noteId,
        setNoteId,
        page,
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
