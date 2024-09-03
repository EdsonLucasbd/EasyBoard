interface FirebaseConfig {
	apiKey: string
	authDomain: string
	projectId: string
	storageBucket: string
	messagingSenderId: string
	appId: string
}

const config: FirebaseConfig = {
	apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || '',
	authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || '',
	projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || '',
	storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || '',
	messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || '',
	appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || '',
}

Object.keys(config).forEach((key) => {
	const configKey = key as keyof FirebaseConfig
	const configValue = config[configKey] + ''
	if (configValue.charAt(0) === '"') {
		config[configKey] = configValue.substring(1, configValue.length - 1)
	}
})

export const firebaseConfig = config
