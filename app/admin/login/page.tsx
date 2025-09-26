import { School } from "lucide-react"
import Link from "next/link"
import { LoginForm } from "@/components/login-form"

export default function AdminLoginPage() {
  return (
    <div 
      className="flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10 relative"
      style={{
        backgroundImage: `url('https://youke1.picui.cn/s1/2025/09/21/68d0109f64116.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* 背景遮罩 */}
      <div className="absolute inset-0 bg-black/40" />
      
      <div className="flex w-full max-w-sm flex-col gap-6 relative z-10">
        <Link href="/" className="flex items-center gap-2 self-center font-medium text-white hover:text-white/80 transition-colors">
          <div className="bg-primary text-primary-foreground flex size-8 items-center justify-center rounded-md">
            <School className="size-5" />
          </div>
          <span className="text-lg">定边县职业教育中心</span>
        </Link>
        <LoginForm />
      </div>
    </div>
  )
}


