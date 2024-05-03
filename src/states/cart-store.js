import create from 'zustand'
import { persist } from 'zustand/middleware'

// Создаем хранилище для корзины
// В файле cart-store.js
const useCartStore = create(
  persist(
    (set, get) => ({
      cart: [],
      addToCart: (product) => {
        const existingProduct = get().cart.find(
          (item) => item.id === product.id
        )
        if (existingProduct) {
          // Если продукт уже есть в корзине, увеличиваем его количество
          const updatedCart = get().cart.map((item) =>
            item.id === existingProduct.id
              ? { ...item, quantityInCart: item.quantityInCart + 1 }
              : item
          )
          set({ cart: updatedCart })
        } else {
          // Иначе добавляем новый продукт в корзину
          set({ cart: [...get().cart, { ...product, quantityInCart: 1 }] })
        }
      },
      removeFromCart: (productId) => {
        const updatedCart = get()
          .cart.map((item) =>
            item.id === productId
              ? { ...item, quantityInCart: item.quantityInCart - 1 }
              : item
          )
          .filter((item) => item.quantityInCart > 0)
        set({ cart: updatedCart })
      },
      clearProductQuantityInCart: (productId) => {
        const updatedCart = get().cart.filter((item) => item.id !== productId)
        set({ cart: updatedCart })
      },
      getTotalPrice: () => {
        return get().cart.reduce(
          (total, product) => total + product.price * product.quantityInCart,
          0
        )
      },
      clearCart: () => {
        set({ cart: [] })
      },
    }),
    {
      name: 'cart-storage',
    }
  )
)

export default useCartStore
