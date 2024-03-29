import React from 'react';
import { Fragment } from 'react';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { supabase } from '../../services/supabase.service';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../Redux/store';
import logo from '../Assets/Logo.png';

const navigation = [
  { name: 'Home', href: '/home', current: false },
  { name: 'My Profile', href: '/myprofile', current: false },
  { name: 'Rentals', href: '/rentals', current: false },
];
function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ');
}

const NavBar: React.FC = (): JSX.Element => {
  const userInfo = useSelector((state: RootState) => state.User);
  const navigate = useNavigate();
  return (
    <Disclosure
      as="nav"
      className="bg-white mt-10  mb-8 mr-16 ml-14 shadow-lg h-20">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-10xl px-2 sm:px-6 lg:px-0 m-0">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden"></div>
              <div className="flex flex-1 items-center ju/rentals/stify-center sm:items-stretch sm:justify-start">
                <div className="flex flex-shrink-0 items-center"></div>
                <div className="hidden sm:ml-0 sm:block">
                  <div className="flex space-x-10">
                    <img
                      src={logo}
                      alt="Logo"
                      className="rounded-full w-[70px] h-[70px] ml-10"
                    />
                    {navigation?.map((item) => (
                      <button
                        key={item.name}
                        onClick={() => navigate(item.href)}
                        className={classNames(
                          item.current
                            ? 'bg-indigo-400 text-pink hover:text-white'
                            : 'text-black hover:shadow-md hover:text-white hover:bg-indigo-400',
                          'rounded-md px-8 py-2 text-lg font-medium'
                        )}
                        aria-current={item.current ? 'page' : undefined}>
                        {item.name}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <button
                  type="button"
                  className="rounded-full p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"></button>
                <Menu as="div" className="relative ml-3">
                  <div>
                    <Menu.Button className="flex rounded-full  text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2  mr-0">
                      <span className="sr-only">Open user menu</span>
                      <img
                        className="h-20 w-20 rounded-full mr-20"
                        src={
                          'https://yiiqhxthvamjfwobhmxz.supabase.co/storage/v1/object/public/images/' +
                          userInfo.profile?.id +
                          '/profileImage'
                        }
                        alt=""
                      />
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95">
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none mr-10">
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(
                              active ? 'bg-indigo-400 text-white' : '',
                              'block px-4 py-2 text-sm text-gray-700'
                            )}
                            onClick={() => navigate(`/edituser`)}>
                            Edit Your Profile
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(
                              active ? 'bg-indigo-400 text-white' : '',
                              'block px-4 py-2 text-sm text-gray-700'
                            )}
                            onClick={() => {
                              supabase.signOut();
                              navigate(`/login`);
                            }}>
                            Sign out
                          </a>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {navigation?.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    item.current
                      ? 'bg-gray-900 text-white'
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                    'block rounded-md px-3 py-2 text-base font-medium'
                  )}
                  aria-current={item.current ? 'page' : undefined}>
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};

export default NavBar;
