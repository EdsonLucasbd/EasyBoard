import React from 'react'
import meela from '../../../../public/login/Meela-Pantalones.svg'
import waiting from '../../../../public/login/Waiting.svg'
import Image from 'next/image'
import Link from 'next/link'
import initTranslations from '@/lib/i18n'
import TranslationsProvider from '@/components/Providers/TranslationsProvider'
import { SignInForm } from '@/components/auth/SignInForm'
import { TranslatorButton } from '@/components/TranslatorButton'

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
			<div className='flex min-h-screen items-center justify-center bg-brand-50'>
				<TranslatorButton />
				<Image
					src={meela}
					alt=''
					aria-hidden
					width={452}
					height={452}
					className='hidden absolute lg:block size-[400px] left-20 bottom-28'
				/>
				<div
					className='flex flex-col items-center justify-center lg:w-[539px] 
          lg:h-[690px] bg-white rounded-[40px] drop-shadow-[0px_4px_10px_rgba(0,0,0,0.15)] px-11 py-12'
				>
					<div className='flex flex-col items-center justify-between h-full w-full'>
						<div className='flex flex-row items-start justify-between w-full'>
							<div className='flex flex-col items-start justify-evenly h-[80px]'>
								<p className='font-normal font-sans text-sm'>{t('wellcome')}</p>
								<h1 className='text-[55px] font-medium font-sans'>
									{t('auth-form:enter')}
								</h1>
							</div>

							<div className='flex flex-col'>
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
					src={waiting}
					alt=''
					aria-hidden
					width={439}
					height={439}
					className='hidden absolute lg:block size-[350px] right-20 bottom-20'
				/>
			</div>
		</TranslationsProvider>
	)
}
