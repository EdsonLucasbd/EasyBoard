import TranslationsProvider from '@/components/Providers/TranslationsProvider'
import { TranslatorButton } from '@/components/TranslatorButton'
import { SignInForm } from '@/components/auth/SignInForm'
import initTranslations from '@/lib/i18n'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const i18nNamespaces = ['auth', 'auth-form']

export default async function Login({
	params: { locale },
}: { params: { locale: string } }) {
	const { t, resources } = await initTranslations({
		locale,
		namespaces: i18nNamespaces,
	})

	return (
		<TranslationsProvider
			namespaces={i18nNamespaces}
			locale={locale}
			resources={resources}
		>
			<div className='flex min-h-screen items-center justify-center bg-brand-50 py-10 lg:py-0'>
				<TranslatorButton className='top-3 right-5 lg:right-20 lg:top-5' />
				<Image
					src={'/login/Meela-Pantalones.svg'}
					alt=''
					aria-hidden
					width={452}
					height={452}
					className='hidden absolute lg:block size-[25rem] left-20 bottom-28'
				/>
				<div
					className='flex flex-col items-center justify-center mt-10 lg:mt-0 w-[20.375rem] lg:w-[33.6875rem] 
          lg:h-[43.125rem] bg-white rounded-[2.5rem] drop-shadow-[0rem_.25rem_.625rem_rgba(0,0,0,0.15)] px-[27px] py-11 lg:px-11 lg:py-12'
				>
					<div className='flex flex-col items-center justify-between h-full w-full'>
						<div className='flex flex-row items-start justify-between w-full'>
							<div className='flex flex-col items-start justify-evenly h-[5rem]'>
								<p className='font-normal font-sans text-sm'>{t('wellcome')}</p>
								<h1 className='text-[2.5rem] lg:text-[3.4375rem] font-medium font-sans'>
									{t('auth-form:enter')}
								</h1>
							</div>

							<div className='flex flex-col text-[.8125rem]'>
								<p>{t('no_account')}</p>
								<Link href='/auth/signup' className='text-brand-500 w-fit'>
									{t('sign_up')}
								</Link>
							</div>
						</div>

						<div className='w-full'>
							<SignInForm />
						</div>
					</div>
				</div>
				<Image
					src={'/login/Waiting.svg'}
					alt=''
					aria-hidden
					width={439}
					height={439}
					className='hidden absolute lg:block size-[21.875rem] right-20 bottom-20'
				/>
			</div>
		</TranslationsProvider>
	)
}
