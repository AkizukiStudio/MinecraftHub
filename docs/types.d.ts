declare module 'vue' {
  import type { DefineComponent } from 'vue'
  const Vue: DefineComponent
  export default Vue
  export * from 'vue'
}

declare module 'vitepress' {
  export function withBase(path: string): string
  export const useData: any
  export const useRoute: any
  export const useRouter: any
}

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}