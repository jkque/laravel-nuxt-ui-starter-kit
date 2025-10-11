import { qrCode, recoveryCodes, secretKey } from '@/routes/two-factor'

async function fetchJson<T>(url: string): Promise<T> {
  const response = await fetch(url, {
    headers: { Accept: 'application/json' },
  })

  if (!response.ok) {
    throw new Error(`Failed to fetch: ${response.status}`)
  }

  return response.json()
}

const errors = ref<string[]>([])
const manualSetupKey = ref<string | null>(null)
const qrCodeSvg = ref<string | null>(null)
const recoveryCodesList = ref<string[]>([])

const hasSetupData = computed<boolean>(() => qrCodeSvg.value !== null && manualSetupKey.value !== null)

export const useTwoFactorAuth = () => {
  async function fetchQrCode(): Promise<void> {
    try {
      const { svg } = await fetchJson<{ svg: string; url: string }>(qrCode.url())

      qrCodeSvg.value = svg
    } catch {
      errors.value.push('Failed to fetch QR code')
      qrCodeSvg.value = null
    }
  }

  async function fetchSetupKey(): Promise<void> {
    try {
      const { secretKey: key } = await fetchJson<{ secretKey: string }>(secretKey.url())

      manualSetupKey.value = key
    } catch {
      errors.value.push('Failed to fetch a setup key')
      manualSetupKey.value = null
    }
  }

  function clearSetupData() {
    manualSetupKey.value = null
    qrCodeSvg.value = null
    clearErrors()
  }

  function clearErrors() {
    errors.value = []
  }

  function clearTwoFactorAuthData() {
    clearSetupData()
    clearErrors()
    recoveryCodesList.value = []
  }

  async function fetchRecoveryCodes(): Promise<void> {
    try {
      clearErrors()
      recoveryCodesList.value = await fetchJson<string[]>(recoveryCodes.url())
    } catch {
      errors.value.push('Failed to fetch recovery codes')
      recoveryCodesList.value = []
    }
  }

  async function fetchSetupData(): Promise<void> {
    try {
      clearErrors()
      await Promise.all([fetchQrCode(), fetchSetupKey()])
    } catch {
      qrCodeSvg.value = null
      manualSetupKey.value = null
    }
  }

  return {
    qrCodeSvg,
    manualSetupKey,
    recoveryCodesList,
    errors,
    hasSetupData,
    clearSetupData,
    clearErrors,
    clearTwoFactorAuthData,
    fetchQrCode,
    fetchSetupKey,
    fetchSetupData,
    fetchRecoveryCodes,
  }
}
