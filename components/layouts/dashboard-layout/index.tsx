/* eslint-disable @next/next/no-img-element */
import {
  Dialog,
  DialogPanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
  TransitionChild,
} from '@headlessui/react'
import {
  Bars3Icon,
  Cog6ToothIcon,
  FolderIcon,
  HomeIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import Cookies from 'js-cookie'
import { ChevronDownIcon } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Avatar from 'react-avatar'
import { twMerge } from 'tailwind-merge'

import { keys } from 'config'
import { Layout } from 'types'

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: HomeIcon, current: true },
  { name: 'Category', href: '#', icon: FolderIcon, current: false },
  { name: 'Product', href: '#', icon: FolderIcon, current: false },
  { name: 'Transaction', href: '#', icon: FolderIcon, current: false },
]

const MobileSidebar = () => (
  <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white px-6 pb-4">
    <div className="flex h-16 shrink-0 items-center">
      <img
        className="h-8 w-auto"
        src="https://tailwindui.com/img/logos/mark.svg?color=slate&shade=600"
        alt="Your Company"
      />
    </div>
    <nav className="flex flex-1 flex-col">
      <ul
        role="list"
        className="flex flex-1 flex-col gap-y-7"
      >
        <li>
          <ul
            role="list"
            className="-mx-2 space-y-1"
          >
            {navigation.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={twMerge(
                    item.current
                      ? 'bg-gray-50 text-slate-600'
                      : 'text-gray-700 hover:bg-gray-50 hover:text-slate-600',
                    'group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6'
                  )}
                >
                  <item.icon
                    className={twMerge(
                      item.current
                        ? 'text-slate-600'
                        : 'text-gray-400 group-hover:text-slate-600',
                      'h-6 w-6 shrink-0'
                    )}
                    aria-hidden="true"
                  />
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </li>
        <li className="mt-auto">
          <a
            href="#"
            className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-gray-700 hover:bg-gray-50 hover:text-slate-600"
          >
            <Cog6ToothIcon
              className="h-6 w-6 shrink-0 text-gray-400 group-hover:text-slate-600"
              aria-hidden="true"
            />
            Settings
          </a>
        </li>
      </ul>
    </nav>
  </div>
)

const DesktopSidebar = () => (
  <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
    {/* Sidebar component, swap this element with another sidebar if you like */}
    <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white px-6 pb-4">
      <div className="flex h-16 shrink-0 items-center">
        <img
          className="h-8 w-auto"
          src="https://tailwindui.com/img/logos/mark.svg?color=slate&shade=600"
          alt="Your Company"
        />
      </div>
      <nav className="flex flex-1 flex-col">
        <ul
          role="list"
          className="flex flex-1 flex-col gap-y-7"
        >
          <li>
            <ul
              role="list"
              className="-mx-2 space-y-1"
            >
              {navigation.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className={twMerge(
                      item.current
                        ? 'bg-gray-50 text-slate-600'
                        : 'text-gray-700 hover:bg-gray-50 hover:text-slate-600',
                      'group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6'
                    )}
                  >
                    <item.icon
                      className={twMerge(
                        item.current
                          ? 'text-slate-600'
                          : 'text-gray-400 group-hover:text-slate-600',
                        'h-6 w-6 shrink-0'
                      )}
                      aria-hidden="true"
                    />
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </li>
        </ul>
      </nav>
    </div>
  </div>
)

export function DashboardLayout({ children }: Layout) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const token = Cookies.get(keys.localStorage)

  const { push } = useRouter()

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!token) {
      push('/')
    } else {
      setLoading(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token])

  if (loading) {
    return <div>...loading</div>
  }

  return (
    <>
      <div>
        <Transition show={sidebarOpen}>
          <Dialog
            className="relative z-50 lg:hidden"
            onClose={setSidebarOpen}
          >
            <TransitionChild
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-900/80" />
            </TransitionChild>

            <div className="fixed inset-0 flex">
              <TransitionChild
                enter="transition ease-in-out duration-300 transform"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
              >
                <DialogPanel className="relative mr-16 flex w-full max-w-xs flex-1">
                  <TransitionChild
                    enter="ease-in-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                      <button
                        type="button"
                        className="-m-2.5 p-2.5"
                        onClick={() => setSidebarOpen(false)}
                      >
                        <span className="sr-only">Close sidebar</span>
                        <XMarkIcon
                          className="h-6 w-6 text-white"
                          aria-hidden="true"
                        />
                      </button>
                    </div>
                  </TransitionChild>
                  {/* Sidebar component, swap this element with another sidebar if you like */}
                  <MobileSidebar />
                </DialogPanel>
              </TransitionChild>
            </div>
          </Dialog>
        </Transition>

        {/* Static sidebar for desktop */}
        <DesktopSidebar />

        <div className="lg:pl-72">
          <div className="sticky top-0 z-40 lg:mx-auto lg:max-w-7xl lg:px-8">
            <div className="flex h-16 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-0 lg:shadow-none">
              <button
                type="button"
                className="-m-2.5 p-2.5 text-gray-700 lg:hidden"
                onClick={() => setSidebarOpen(true)}
              >
                <span className="sr-only">Open sidebar</span>
                <Bars3Icon
                  className="h-6 w-6"
                  aria-hidden="true"
                />
              </button>

              {/* Separator */}
              <div
                className="h-6 w-px bg-gray-200 lg:hidden"
                aria-hidden="true"
              />

              <div className="flex flex-1 justify-end gap-x-4 self-stretch lg:gap-x-6">
                <div className="flex items-center justify-end gap-x-4 lg:gap-x-6">
                  {/* Separator */}

                  {/* Profile dropdown */}
                  <Menu
                    as="div"
                    className="relative"
                  >
                    <MenuButton className="-m-1.5 flex items-center p-1.5">
                      <span className="sr-only">Open user menu</span>

                      <Avatar
                        name="Hasan"
                        size="36"
                        className="rounded-full"
                      />
                      <span className="hidden lg:flex lg:items-center">
                        <span
                          className="ml-4 text-sm font-semibold leading-6 text-gray-900"
                          aria-hidden="true"
                        >
                          Hasan
                        </span>
                        <ChevronDownIcon
                          className="ml-2 h-5 w-5 text-gray-400"
                          aria-hidden="true"
                        />
                      </span>
                    </MenuButton>
                    <Transition
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <MenuItems className="absolute right-0 z-10 mt-2.5 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
                        <MenuItem>
                          {({ focus }) => (
                            <Link
                              href="/dashboard/profile"
                              className={twMerge(
                                focus ? 'bg-gray-50' : '',
                                'block px-3 py-1 text-sm leading-6 text-gray-900'
                              )}
                            >
                              Profile
                            </Link>
                          )}
                        </MenuItem>
                        <MenuItem>
                          {({ focus }) => (
                            <button
                              className={twMerge(
                                focus ? 'bg-gray-50' : '',
                                'block w-full px-3 py-1 text-left text-sm leading-6 text-gray-900'
                              )}
                              onClick={() => {
                                Cookies.remove(keys.localStorage)
                                push('/')
                              }}
                            >
                              Sign out
                            </button>
                          )}
                        </MenuItem>
                      </MenuItems>
                    </Transition>
                  </Menu>
                </div>
              </div>
            </div>
          </div>

          <main className="py-10">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              {children}
            </div>
          </main>
        </div>
      </div>
    </>
  )
}
