// import { RealtimeChannel, Session } from '@supabase/supabase-js';
import { Session } from '@supabase/supabase-js';
import { useEffect, useState } from 'react';
import { supabase, supabaseClient } from '../../services/supabase.service';
import { User } from '../../types/user.type';

export interface GearhubUserInfo {
  session: Session | null;
  profile: User | null | undefined;
}

export function useSession(): GearhubUserInfo {
  const [userInfo, setUserInfo] = useState<GearhubUserInfo>({
    profile: null,
    session: null,
  });

  // const [channel, setChannel] = useState<RealtimeChannel | null>(null);

  useEffect(() => {
    supabaseClient.auth.getSession().then(({ data: { session } }) => {
      setUserInfo({ ...userInfo, session });
      supabaseClient.auth.onAuthStateChange((_event: any, session: any) => {
        setUserInfo({ session, profile: null });
      });
      supabase
        .getSingleUserByEmail(session?.user.email)
        .then((userData) => setUserInfo({ session, profile: userData }));
    });
  }, []);

  // useEffect(() => {
  //   if (userInfo.session?.user && !userInfo.profile) {
  //     listenToUserProfileChanges(userInfo.session.user.id).then(
  //       (newChannel) => {
  //         if (channel) {
  //           channel.unsubscribe();
  //         }
  //         setChannel(newChannel);
  //       }
  //     );
  //   } else if (!userInfo.session?.user) {
  //     channel?.unsubscribe();
  //     setChannel(null);
  //   }
  // }, [userInfo.session]);

  // async function listenToUserProfileChanges(userId: string) {
  //   const { data } = await supabaseClient
  //     .from('user_profiles')
  //     .select('*')
  //     .filter('user_id', 'eq', userId);
  //   if (data?.[0]) {
  //     setUserInfo({ ...userInfo, profile: data?.[0] });
  //   }
  //   return supabaseClient
  //     .channel(`public:user_profiles`)
  //     .on(
  //       'postgres_changes',
  //       {
  //         event: '*',
  //         schema: 'public',
  //         table: 'user_profiles',
  //         filter: `user_id=eq.${userId}`,
  //       },
  //       (payload: any) => {
  //         setUserInfo({ ...userInfo, profile: payload.new as UserProfile });
  //       }
  //     )
  //     .subscribe();
  // }

  return userInfo;
}