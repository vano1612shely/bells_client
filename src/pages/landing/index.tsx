import { LandingFooter } from '@/pages/landing/footer.tsx'
import ProductGrid from '@/pages/landing/products.tsx'
import ProductFeatures from '@/pages/landing/productFeatures.tsx'
import ProductLine from '@/pages/landing/productLine.tsx'
import ProductSpecs from '@/pages/landing/productSpecs.tsx'
import ReviewsSlider from '@/pages/landing/reviews.tsx'
import DeliverySection from '@/pages/landing/deliverySection.tsx'
import HeaderSection from '@/pages/landing/header.tsx'
import OrderForm from '@/pages/landing/orderForm.tsx'
import OrderButtonMobile from '@/pages/landing/orderButtonMobile.tsx'

export const LandingPage = () => {
  return (
    <>
      <HeaderSection />
      <main>
        <ProductGrid />
        <ProductFeatures />
        <ProductLine />
        <ProductSpecs />
        <ReviewsSlider />
        <DeliverySection />
        <OrderForm />
      </main>
      <LandingFooter />
      <OrderButtonMobile />
    </>
  )
}
