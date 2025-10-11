export function useAuth() {
  return computed(() => usePage().props.auth)
}
