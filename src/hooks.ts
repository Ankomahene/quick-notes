import { useContext } from 'react';
import { AppContext } from './context/AppContext';
import { useQuery } from 'react-query';
import { INote } from './types';
import supabase from './utils/supabase';

export const useAppContext = () => {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error('useAppContext must be used within an AppContextProvider');
  }

  return context;
};

const getNotes = async () =>
  await supabase
    .from('notes')
    .select('*')
    .eq('user_id', 1)
    .order('updated_at', { ascending: false })
    .returns<INote[]>();

export const useNotes = () => {
  const { data: res, error, isLoading } = useQuery('notes', getNotes);
  return { notes: res?.data || [], error: res?.error || error, isLoading };
};
