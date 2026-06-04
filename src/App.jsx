import { useEffect, useMemo, useState } from 'react'
import './App.css'

const IMG = {
  hero: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1400&h=700&fit=crop&auto=format',
  e1: 'https://images.unsplash.com/photo-1590247813693-5541d1c609fd?w=700&h=320&fit=crop&auto=format',
  e2: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=700&h=320&fit=crop&auto=format',
  e3: 'https://images.unsplash.com/photo-1567521464027-f127ff144326?w=700&h=320&fit=crop&auto=format',
  e4: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=700&h=320&fit=crop&auto=format',
  e5: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=700&h=320&fit=crop&auto=format',
  e6: 'https://images.unsplash.com/photo-1573496267765-9bd5de0b6f33?w=700&h=320&fit=crop&auto=format',
  e7: 'https://images.unsplash.com/photo-1565008447742-97f6f38c985c?w=700&h=320&fit=crop&auto=format',
  e8: 'https://images.unsplash.com/photo-1587293852726-70cdb56c2866?w=700&h=320&fit=crop&auto=format',
  e9: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=700&h=320&fit=crop&auto=format',
  e10: 'https://images.unsplash.com/photo-1628744448840-55bdb2497bd4?w=700&h=320&fit=crop&auto=format',
}

const REGIONS = ['تونس', 'سوسة', 'صفاقس', 'نابل', 'بنزرت', 'المنستير', 'القيروان', 'بجة']
const TYPES = ['تونال معدني', 'تونال خشبي', 'قواعد صب', 'منصات عمل']

const demoEquipment = [
  {
    id: 'eq-1', name: 'كوفراج تونال مرن', type: 'تونال معدني', price: 180,
    region: 'تونس', ownerId: 'u-provider', ownerName: 'شركة الريادة للبناء',
    rating: 4.7, area: '150 م²', quantity: 5, available: true,
    description: 'نظام تونال معدني مناسب للمشاريع المتوسطة مع إمكانية توسعة سريعة وتكيّف مع أشكال متعددة.',
    image: IMG.e1, images: [IMG.e1, IMG.e4],
  },
  {
    id: 'eq-2', name: 'كوفراج أعمدة سريع', type: 'تونال معدني', price: 220,
    region: 'سوسة', ownerId: 'u-provider', ownerName: 'شركة الريادة للبناء',
    rating: 4.5, area: '90 م²', quantity: 3, available: true,
    description: 'مخصص للأعمدة والحوائط مع نقاط تثبيت معززة وقوة تحمّل عالية.',
    image: IMG.e2, images: [IMG.e2, IMG.e7],
  },
  {
    id: 'eq-3', name: 'منصة صب متحركة', type: 'تونال خشبي', price: 120,
    region: 'صفاقس', ownerId: 'u-p2', ownerName: 'كراء الخليج',
    rating: 4.2, area: '60 م²', quantity: 2, available: false,
    description: 'منصة صب قابلة للنقل السريع لمواقع متعددة، خفيفة الوزن وسهلة التركيب.',
    image: IMG.e3, images: [IMG.e3],
  },
  {
    id: 'eq-4', name: 'كوفراج جدران معدني', type: 'تونال معدني', price: 200,
    region: 'نابل', ownerId: 'u-p3', ownerName: 'مؤسسة المستقبل للبناء',
    rating: 4.6, area: '120 م²', quantity: 4, available: true,
    description: 'كوفراج جدران قوي ومتين للمباني السكنية والتجارية، يتميز بالدقة في القياس.',
    image: IMG.e4, images: [IMG.e4, IMG.e1],
  },
  {
    id: 'eq-5', name: 'كوفراج سقف خشبي', type: 'تونال خشبي', price: 95,
    region: 'بنزرت', ownerId: 'u-p4', ownerName: 'كراء المدار',
    rating: 3.9, area: '80 م²', quantity: 6, available: true,
    description: 'نظام سقف خشبي مناسب للأسقف الأفقية ومساحات الطوابق، سعر مناسب للمشاريع الصغيرة.',
    image: IMG.e5, images: [IMG.e5],
  },
  {
    id: 'eq-6', name: 'نظام تونال هيدروليكي', type: 'تونال معدني', price: 350,
    region: 'تونس', ownerId: 'u-p3', ownerName: 'مؤسسة المستقبل للبناء',
    rating: 4.9, area: '200 م²', quantity: 2, available: true,
    description: 'نظام هيدروليكي متطور للمشاريع الكبيرة مع دقة عالية في التحكم وسرعة في التركيب.',
    image: IMG.e6, images: [IMG.e6, IMG.e9],
  },
  {
    id: 'eq-7', name: 'كوفراج قواعد مرن', type: 'قواعد صب', price: 140,
    region: 'القيروان', ownerId: 'u-p4', ownerName: 'كراء المدار',
    rating: 4.3, area: '70 م²', quantity: 8, available: true,
    description: 'مناسب لصب قواعد الأعمدة والأساسات بأشكال متنوعة، مرونة عالية في الاستخدام.',
    image: IMG.e7, images: [IMG.e7],
  },
  {
    id: 'eq-8', name: 'منصة عمل متحركة', type: 'منصات عمل', price: 75,
    region: 'المنستير', ownerId: 'u-provider', ownerName: 'شركة الريادة للبناء',
    rating: 4.1, area: '40 م²', quantity: 10, available: true,
    description: 'منصة عمل خفيفة ومتحركة لأعمال التشطيب والصيانة، مناسبة للطوابق والأسطح.',
    image: IMG.e8, images: [IMG.e8, IMG.e5],
  },
  {
    id: 'eq-9', name: 'كوفراج حوائط ثقيل', type: 'تونال معدني', price: 280,
    region: 'سوسة', ownerId: 'u-p3', ownerName: 'مؤسسة المستقبل للبناء',
    rating: 4.8, area: '180 م²', quantity: 3, available: false,
    description: 'للمشاريع الكبيرة ذات الجدران السميكة، مع دعامات فولاذية مدمجة وقدرة تحمل عالية.',
    image: IMG.e9, images: [IMG.e9, IMG.e2],
  },
  {
    id: 'eq-10', name: 'نظام صب أفقي', type: 'قواعد صب', price: 160,
    region: 'صفاقس', ownerId: 'u-p4', ownerName: 'كراء المدار',
    rating: 4.4, area: '100 م²', quantity: 5, available: true,
    description: 'نظام متخصص في الصب الأفقي للأرضيات والأسقف المسطحة، سهل التنظيف والصيانة.',
    image: IMG.e10, images: [IMG.e10, IMG.e3],
  },
]

const demoUsers = [
  { id: 'u-contractor', name: 'مقاولات البناء الحديثة', role: 'contractor', active: true },
  { id: 'u-provider', name: 'شركة الريادة للبناء', role: 'provider', active: true },
  { id: 'u-p2', name: 'كراء الخليج', role: 'provider', active: true },
  { id: 'u-p3', name: 'مؤسسة المستقبل للبناء', role: 'provider', active: true },
  { id: 'u-p4', name: 'كراء المدار', role: 'provider', active: false },
  { id: 'u-admin', name: 'إدارة المنصة', role: 'admin', active: true },
]

const demoRequests = [
  {
    id: 'req-1', equipmentId: 'eq-1', contractorId: 'u-contractor',
    providerId: 'u-provider', duration: 10, quantity: 2, total: 3600,
    status: 'قيد الدراسة', createdAt: '2026-06-01',
  },
  {
    id: 'req-2', equipmentId: 'eq-4', contractorId: 'u-contractor',
    providerId: 'u-p3', duration: 5, quantity: 1, total: 1000,
    status: 'مقبول', createdAt: '2026-05-28',
  },
  {
    id: 'req-3', equipmentId: 'eq-8', contractorId: 'u-contractor',
    providerId: 'u-provider', duration: 3, quantity: 2, total: 450,
    status: 'مرفوض', createdAt: '2026-05-20',
  },
]

const demoMessages = [
  {
    id: 'msg-1', requestId: 'req-1', from: 'u-contractor', to: 'u-provider',
    text: 'مرحباً، هل يمكن توفير المعدة اعتباراً من 10 جوان؟', date: '2026-06-01',
  },
  {
    id: 'msg-2', requestId: 'req-1', from: 'u-provider', to: 'u-contractor',
    text: 'نعم، المعدة متاحة من ذلك التاريخ. سيتم التأكيد خلال 24 ساعة.', date: '2026-06-01',
  },
  {
    id: 'msg-3', requestId: 'req-1', from: 'u-contractor', to: 'u-provider',
    text: 'شكراً، في انتظار تأكيدكم.', date: '2026-06-02',
  },
  {
    id: 'msg-4', requestId: 'req-2', from: 'u-contractor', to: 'u-p3',
    text: 'هل يمكن إرسال المعدة للموقع الواقع في مدينة نابل؟', date: '2026-05-29',
  },
]

const viewOptions = [
  { id: 'home', label: 'الرئيسية' },
  { id: 'catalogue', label: 'المعدات' },
  { id: 'login', label: 'تسجيل الدخول' },
  { id: 'signup', label: 'إنشاء حساب' },
  { id: 'contractor', label: 'فضاء المقاول' },
  { id: 'provider', label: 'فضاء المزود' },
  { id: 'admin', label: 'الإدارة' },
]

function useStoredState(key, fallback) {
  const [value, setValue] = useState(() => {
    if (typeof window === 'undefined') return fallback
    const raw = window.localStorage.getItem(key)
    if (!raw) return fallback
    try { return JSON.parse(raw) } catch { return fallback }
  })
  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(value))
  }, [key, value])
  return [value, setValue]
}

function Stars({ score = 0, onRate }) {
  return (
    <div className="stars">
      {[1, 2, 3, 4, 5].map((s) => (
        <button
          key={s}
          type="button"
          className={`star-btn${s <= Math.round(score) ? ' filled' : ''}`}
          onClick={() => onRate?.(s)}
          style={{ cursor: onRate ? 'pointer' : 'default' }}
        >
          ★
        </button>
      ))}
    </div>
  )
}

function StatusBadge({ status }) {
  const cls = status === 'مقبول' ? 'badge-ok' : status === 'مرفوض' ? 'badge-err' : 'badge-warn'
  return <span className={`status-badge ${cls}`}>{status}</span>
}

function AvailBadge({ available }) {
  return <span className={`avail-badge ${available ? 'av-yes' : 'av-no'}`}>{available ? 'متاح' : 'غير متاح'}</span>
}

function App() {
  const [view, setView] = useState('home')
  const [activeRole, setActiveRole] = useState('guest')
  const [equipment, setEquipment] = useStoredState('demo_equipment_v3', demoEquipment)
  const [users, setUsers] = useStoredState('demo_users_v3', demoUsers)
  const [requests, setRequests] = useStoredState('demo_requests_v3', demoRequests)
  const [messages, setMessages] = useStoredState('demo_messages_v3', demoMessages)
  const [ratings, setRatings] = useStoredState('demo_ratings_v3', [])
  const [selectedEquipmentId, setSelectedEquipmentId] = useState('eq-1')
  const [filters, setFilters] = useState({ region: 'الكل', type: 'الكل', availability: 'الكل', minPrice: '', maxPrice: '' })
  const [requestDraft, setRequestDraft] = useState({ duration: 7, quantity: 1 })
  const [equipmentForm, setEquipmentForm] = useState({ id: '', name: '', type: 'تونال معدني', price: 150, region: 'تونس', quantity: 5, description: '' })
  const [contractorTab, setContractorTab] = useState('overview')
  const [providerTab, setProviderTab] = useState('overview')
  const [activeMessageRequest, setActiveMessageRequest] = useState('req-1')
  const [messageText, setMessageText] = useState('')

  const currentUser = useMemo(() => {
    if (activeRole === 'contractor') return users.find(u => u.role === 'contractor')
    if (activeRole === 'provider') return users.find(u => u.role === 'provider')
    if (activeRole === 'admin') return users.find(u => u.role === 'admin')
    return null
  }, [activeRole, users])

  const selectedEquipment = equipment.find(e => e.id === selectedEquipmentId) || equipment[0]

  const filteredEquipment = equipment.filter(item => {
    if (filters.region !== 'الكل' && item.region !== filters.region) return false
    if (filters.type !== 'الكل' && item.type !== filters.type) return false
    if (filters.availability !== 'الكل' && item.available !== (filters.availability === 'متاح')) return false
    if (filters.minPrice && item.price < Number(filters.minPrice)) return false
    if (filters.maxPrice && item.price > Number(filters.maxPrice)) return false
    return true
  })

  const providerRequests = requests.filter(r => r.providerId === 'u-provider')
  const contractorRequests = requests.filter(r => r.contractorId === 'u-contractor')
  const providerRevenue = providerRequests.filter(r => r.status === 'مقبول').reduce((s, r) => s + r.total, 0)

  const getUserName = (id) => users.find(u => u.id === id)?.name || id
  const getEquipName = (id) => equipment.find(e => e.id === id)?.name || id

  const handleSubmitRequest = () => {
    if (!selectedEquipment) return
    const duration = Math.max(1, Number(requestDraft.duration) || 1)
    const quantity = Math.max(1, Number(requestDraft.quantity) || 1)
    const total = duration * quantity * selectedEquipment.price
    setRequests(prev => [{
      id: `req-${Date.now()}`,
      equipmentId: selectedEquipment.id,
      contractorId: 'u-contractor',
      providerId: selectedEquipment.ownerId,
      duration, quantity, total,
      status: 'قيد الدراسة',
      createdAt: new Date().toISOString().slice(0, 10),
    }, ...prev])
    setView('contractor')
    setContractorTab('requests')
  }

  const handleRequestStatus = (requestId, status) => {
    setRequests(prev => prev.map(r => r.id === requestId ? { ...r, status } : r))
  }

  const handleSaveEquipment = (e) => {
    e.preventDefault()
    const payload = {
      id: equipmentForm.id || `eq-${Date.now()}`,
      name: equipmentForm.name || 'معدة جديدة',
      type: equipmentForm.type,
      price: Number(equipmentForm.price) || 0,
      region: equipmentForm.region,
      quantity: Number(equipmentForm.quantity) || 1,
      ownerId: 'u-provider',
      ownerName: 'شركة الريادة للبناء',
      rating: 4.5,
      area: '100 م²',
      available: true,
      description: equipmentForm.description || 'وصف مختصر للمعدة.',
      image: IMG.e1,
      images: [IMG.e1],
    }
    setEquipment(prev => {
      const exists = prev.some(item => item.id === payload.id)
      return exists
        ? prev.map(item => item.id === payload.id ? { ...item, ...payload } : item)
        : [payload, ...prev]
    })
    setEquipmentForm({ id: '', name: '', type: 'تونال معدني', price: 150, region: 'تونس', quantity: 5, description: '' })
  }

  const handleEditEquipment = (item) => {
    setEquipmentForm({ id: item.id, name: item.name, type: item.type, price: item.price, region: item.region, quantity: item.quantity || 1, description: item.description })
    setProviderTab('equipment')
  }

  const handleDeleteEquipment = (id) => setEquipment(prev => prev.filter(item => item.id !== id))

  const handleToggleAvailability = (id) => {
    setEquipment(prev => prev.map(item => item.id === id ? { ...item, available: !item.available } : item))
  }

  const handleToggleUser = (id) => {
    setUsers(prev => prev.map(u => u.id === id ? { ...u, active: !u.active } : u))
  }

  const handleSendMessage = () => {
    if (!messageText.trim() || !activeMessageRequest) return
    setMessages(prev => [...prev, {
      id: `msg-${Date.now()}`,
      requestId: activeMessageRequest,
      from: activeRole === 'provider' ? 'u-provider' : 'u-contractor',
      to: activeRole === 'provider' ? 'u-contractor' : 'u-provider',
      text: messageText.trim(),
      date: new Date().toISOString().slice(0, 10),
    }])
    setMessageText('')
  }

  const handleRate = (requestId, score) => {
    setRatings(prev => {
      const exists = prev.some(r => r.requestId === requestId)
      return exists
        ? prev.map(r => r.requestId === requestId ? { ...r, score } : r)
        : [...prev, { requestId, score, date: new Date().toISOString().slice(0, 10) }]
    })
  }

  return (
    <div className="app">
      <header className="topbar">
        <div className="brand">
          <div className="brand-badge">كوفراج</div>
          <div>
            <p className="brand-title">منصة كوفراج تونال</p>
            <p className="brand-subtitle">شبكة رقمية لمعدات البناء في تونس</p>
          </div>
        </div>
        <nav className="nav">
          {viewOptions.map(opt => (
            <button
              key={opt.id}
              type="button"
              className={view === opt.id ? 'nav-link active' : 'nav-link'}
              onClick={() => setView(opt.id)}
            >
              {opt.label}
            </button>
          ))}
        </nav>
        <div className="role-switch">
          <span>وضع:</span>
          {['guest', 'contractor', 'provider', 'admin'].map(role => (
            <button
              key={role}
              type="button"
              className={activeRole === role ? 'chip active' : 'chip'}
              onClick={() => setActiveRole(role)}
            >
              {role === 'guest' ? 'زائر' : role === 'contractor' ? 'مقاول' : role === 'provider' ? 'مزود' : 'مدير'}
            </button>
          ))}
        </div>
      </header>

      <main>
        {/* ─── HOME ─────────────────────────────────── */}
        {view === 'home' && (
          <>
            <section className="hero">
              <div className="hero-content">
                <p className="pill">منصة رقمية ذكية لكراء الكوفراج التونال</p>
                <h1>منصة رقمية ذكية لكراء الكوفراج التونال ومعدات البناء</h1>
                <p className="lead">
                  تربط المنصة بين أصحاب معدات الكوفراج وشركات البناء، مما يسمح بالبحث عن
                  المعدات المتاحة، مقارنة العروض، وإتمام عمليات الكراء بطريقة منظمة وسريعة.
                </p>
                <div className="button-row">
                  <button type="button" className="btn primary" onClick={() => setView('catalogue')}>تصفح المعدات</button>
                  <button type="button" className="btn ghost" onClick={() => setView('signup')}>إنشاء حساب</button>
                </div>
              </div>
              <div className="hero-image">
                <img src={IMG.hero} alt="موقع بناء بالكوفراج" />
                <div className="hero-image-overlay">
                  <span>أكثر من 150 معدة جاهزة للتأجير</span>
                </div>
              </div>
            </section>

            <section className="section">
              <h2>كيف تعمل المنصة؟</h2>
              <div className="steps">
                {[
                  { title: 'التسجيل وإضافة المعدات', desc: 'يسجل صاحب المعدات ويضيف معداته مع الصور والأسعار.' },
                  { title: 'البحث والاكتشاف', desc: 'يبحث المقاول عن المعدات المناسبة لمشروعه بفلاتر متعددة.' },
                  { title: 'إرسال طلب الكراء', desc: 'يرسل طلب كراء عبر المنصة بتحديد المدة والكمية.' },
                  { title: 'الموافقة وإتمام الكراء', desc: 'تتم الموافقة على الطلب وإتمام عملية الكراء بشكل رقمي.' },
                ].map((step, i) => (
                  <div key={step.title} className="step-card">
                    <span className="step-number">0{i + 1}</span>
                    <h4>{step.title}</h4>
                    <p>{step.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="section highlight">
              <h2>مزايا المنصة</h2>
              <div className="grid">
                {[
                  { icon: '⚡', title: 'سرعة الوصول للمعدات', desc: 'البحث عن الكوفراج المتاح في وقت قصير دون الحاجة إلى الاتصالات التقليدية.' },
                  { icon: '⚖️', title: 'مقارنة العروض', desc: 'إمكانية مقارنة الأسعار والكميات بين عدة مزودين في نفس الوقت.' },
                  { icon: '📈', title: 'تحسين استغلال المعدات', desc: 'تمكين أصحاب المعدات من زيادة معدل استغلال أصولهم وتعظيم الإيرادات.' },
                  { icon: '🔍', title: 'شفافية أكبر', desc: 'عرض معلومات واضحة وكاملة حول المعدات والأسعار والمزودين.' },
                  { icon: '⭐', title: 'نظام تقييم', desc: 'تقييم المستخدمين بعد كل عملية كراء لتحسين جودة الخدمات.' },
                  { icon: '🏗️', title: 'رقمنة قطاع البناء', desc: 'الانتقال من الطرق التقليدية إلى إدارة رقمية حديثة وفعّالة.' },
                ].map(f => (
                  <div key={f.title} className="feature-card">
                    <span className="feature-icon">{f.icon}</span>
                    <h3>{f.title}</h3>
                    <p>{f.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="section">
              <h2>الفئات المستهدفة</h2>
              <div className="split">
                <div className="card target-card">
                  <div className="target-icon">🏢</div>
                  <h3>أصحاب المعدات</h3>
                  <ul>
                    <li>شركات كراء المعدات.</li>
                    <li>مالكو الكوفراج التونال.</li>
                  </ul>
                </div>
                <div className="card target-card">
                  <div className="target-icon">👷</div>
                  <h3>شركات البناء</h3>
                  <ul>
                    <li>المقاولون.</li>
                    <li>مكاتب الإنجاز.</li>
                    <li>شركات الأشغال العمومية.</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="section highlight">
              <h2>لماذا هذه المنصة؟</h2>
              <div className="grid four">
                {[
                  { icon: '⏱️', title: 'تقليل الوقت', desc: 'تقليل الوقت اللازم للبحث عن المعدات بنسبة 70%.' },
                  { icon: '💰', title: 'تقليل التكلفة', desc: 'المقارنة بين العروض المتاحة للحصول على أفضل سعر.' },
                  { icon: '🔄', title: 'زيادة الاستغلال', desc: 'رفع نسبة استغلال المعدات غير المستعملة.' },
                  { icon: '🤝', title: 'تسهيل التواصل', desc: 'توفير منصة موحدة بين العرض والطلب.' },
                ].map(f => (
                  <div key={f.title} className="feature-card">
                    <span className="feature-icon">{f.icon}</span>
                    <h3>{f.title}</h3>
                    <p>{f.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="section">
              <h2>إحصائيات</h2>
              <div className="stats">
                {[
                  { num: '150+', label: 'معدة معروضة' },
                  { num: '40', label: 'شركة مزودة' },
                  { num: '85', label: 'مقاولاً مسجلاً' },
                  { num: '320', label: 'عملية كراء' },
                ].map(s => (
                  <div key={s.label} className="stat-card">
                    <strong>{s.num}</strong>
                    <span>{s.label}</span>
                  </div>
                ))}
              </div>
            </section>

            <section className="section">
              <h2>آراء المستخدمين</h2>
              <div className="testimonials">
                <blockquote>
                  <Stars score={5} />
                  <p>"ساعدتنا المنصة في العثور على كوفراج مناسب بسرعة كبيرة، وفّرنا أسبوعاً كاملاً من التنقل والاتصالات."</p>
                  <footer>— شركة المقاولات الشمالية، تونس</footer>
                </blockquote>
                <blockquote>
                  <Stars score={5} />
                  <p>"تمكنا من زيادة عدد عمليات الكراء لمعداتنا بشكل ملحوظ. المنصة سهلة الاستخدام واحترافية."</p>
                  <footer>— كراء المدار، بنزرت</footer>
                </blockquote>
                <blockquote>
                  <Stars score={4} />
                  <p>"منصة احترافية وسهلة الاستخدام، أنصح بها كل المقاولين وشركات البناء في تونس."</p>
                  <footer>— مكتب هندسي، صفاقس</footer>
                </blockquote>
              </div>
            </section>

            <section className="cta">
              <div>
                <h2>ابدأ الآن واستفد من أول منصة متخصصة في كراء الكوفراج التونال</h2>
                <p>سجّل كمقاول أو كمزود وابدأ بإدارة عملياتك رقمياً اليوم.</p>
              </div>
              <div className="button-row">
                <button type="button" className="btn primary" onClick={() => setView('signup')}>إنشاء حساب كمقاول</button>
                <button type="button" className="btn ghost" onClick={() => setView('signup')}>إنشاء حساب كمزود</button>
              </div>
            </section>
          </>
        )}

        {/* ─── CATALOGUE ────────────────────────────── */}
        {view === 'catalogue' && (
          <section className="section">
            <div className="section-head">
              <div>
                <h2>كتالوج المعدات</h2>
                <p>{filteredEquipment.length} معدة مطابقة</p>
              </div>
            </div>
            <div className="filters">
              <select value={filters.region} onChange={e => setFilters({ ...filters, region: e.target.value })}>
                {['الكل', ...REGIONS].map(opt => <option key={opt}>{opt}</option>)}
              </select>
              <select value={filters.type} onChange={e => setFilters({ ...filters, type: e.target.value })}>
                {['الكل', ...TYPES].map(opt => <option key={opt}>{opt}</option>)}
              </select>
              <select value={filters.availability} onChange={e => setFilters({ ...filters, availability: e.target.value })}>
                {['الكل', 'متاح', 'غير متاح'].map(opt => <option key={opt}>{opt}</option>)}
              </select>
              <input type="number" placeholder="أقل سعر (د.ت)" value={filters.minPrice}
                onChange={e => setFilters({ ...filters, minPrice: e.target.value })} />
              <input type="number" placeholder="أعلى سعر (د.ت)" value={filters.maxPrice}
                onChange={e => setFilters({ ...filters, maxPrice: e.target.value })} />
              <button type="button" className="btn ghost" onClick={() => setFilters({ region: 'الكل', type: 'الكل', availability: 'الكل', minPrice: '', maxPrice: '' })}>
                إعادة ضبط
              </button>
            </div>

            {filteredEquipment.length === 0 ? (
              <div className="empty-state">
                <p>لا توجد معدات مطابقة للفلاتر المحددة.</p>
              </div>
            ) : (
              <div className="grid three">
                {filteredEquipment.map(item => (
                  <article key={item.id} className="equipment-card">
                    <div className="equipment-photo">
                      <img src={item.image} alt={item.name} />
                      <AvailBadge available={item.available} />
                    </div>
                    <div className="card-body">
                      <h3>{item.name}</h3>
                      <p className="card-type">{item.type}</p>
                      <p className="card-price">{item.price} <span>د.ت / يوم</span></p>
                      <div className="card-meta-row">
                        <span>📍 {item.region}</span>
                        <span>📦 {item.quantity} وحدات</span>
                      </div>
                      <p className="card-owner">{item.ownerName}</p>
                      <Stars score={item.rating} />
                    </div>
                    <button
                      type="button"
                      className="btn ghost"
                      onClick={() => { setSelectedEquipmentId(item.id); setView('details') }}
                    >
                      التفاصيل
                    </button>
                  </article>
                ))}
              </div>
            )}
          </section>
        )}

        {/* ─── DETAILS ──────────────────────────────── */}
        {view === 'details' && selectedEquipment && (
          <section className="section">
            <div className="section-head">
              <div>
                <h2>تفاصيل المعدة</h2>
                <p>معلومات شاملة عن المعدة والمالك.</p>
              </div>
              <button type="button" className="btn ghost" onClick={() => setView('catalogue')}>← العودة للكتالوج</button>
            </div>

            <div className="details">
              <div className="details-gallery">
                {selectedEquipment.images.map((url, i) => (
                  <div key={i} className="equipment-photo large">
                    <img src={url} alt={`${selectedEquipment.name} - صورة ${i + 1}`} />
                  </div>
                ))}
              </div>
              <div className="details-card">
                <div className="details-header">
                  <h3>{selectedEquipment.name}</h3>
                  <AvailBadge available={selectedEquipment.available} />
                </div>
                <p className="details-desc">{selectedEquipment.description}</p>
                <div className="details-grid">
                  <div className="detail-item">
                    <span className="detail-label">المساحة</span>
                    <span className="detail-val">{selectedEquipment.area}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">السعر</span>
                    <span className="detail-val">{selectedEquipment.price} د.ت / يوم</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">النوع</span>
                    <span className="detail-val">{selectedEquipment.type}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">الولاية</span>
                    <span className="detail-val">{selectedEquipment.region}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">الكمية</span>
                    <span className="detail-val">{selectedEquipment.quantity} وحدات</span>
                  </div>
                </div>

                <div className="owner-card">
                  <h4>معلومات المالك</h4>
                  <p className="owner-name">{selectedEquipment.ownerName}</p>
                  <div className="owner-rating">
                    <Stars score={selectedEquipment.rating} />
                    <small>{selectedEquipment.rating} / 5</small>
                  </div>
                </div>

                <div className="request-form">
                  <h4>طلب كراء</h4>
                  <div className="form-row">
                    <label>
                      المدة (أيام)
                      <input type="number" min="1" value={requestDraft.duration}
                        onChange={e => setRequestDraft({ ...requestDraft, duration: e.target.value })} />
                    </label>
                    <label>
                      الكمية
                      <input type="number" min="1" max={selectedEquipment.quantity} value={requestDraft.quantity}
                        onChange={e => setRequestDraft({ ...requestDraft, quantity: e.target.value })} />
                    </label>
                  </div>
                  <div className="total">
                    الإجمالي التقريبي:{' '}
                    <strong>
                      {Number(requestDraft.duration || 0) * Number(requestDraft.quantity || 0) * selectedEquipment.price} د.ت
                    </strong>
                  </div>
                  <button
                    type="button"
                    className="btn primary"
                    onClick={activeRole === 'contractor' ? handleSubmitRequest : () => setView('login')}
                    disabled={!selectedEquipment.available}
                  >
                    {!selectedEquipment.available
                      ? 'المعدة غير متاحة حالياً'
                      : activeRole === 'contractor'
                        ? 'إرسال الطلب'
                        : 'سجّل دخولك لإرسال الطلب'}
                  </button>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ─── LOGIN ────────────────────────────────── */}
        {view === 'login' && (
          <section className="section narrow">
            <h2>تسجيل الدخول</h2>
            <form className="form" onSubmit={e => { e.preventDefault(); setActiveRole('contractor'); setView('contractor') }}>
              <label>
                البريد الإلكتروني
                <input type="email" placeholder="example@mail.com" />
              </label>
              <label>
                كلمة المرور
                <input type="password" placeholder="••••••" />
              </label>
              <button type="submit" className="btn primary">دخول</button>
              <p className="form-note">
                لا تملك حساباً؟{' '}
                <button type="button" className="link-btn" onClick={() => setView('signup')}>إنشاء حساب</button>
              </p>
            </form>
          </section>
        )}

        {/* ─── SIGNUP ───────────────────────────────── */}
        {view === 'signup' && (
          <section className="section narrow">
            <h2>إنشاء حساب</h2>
            <form className="form" onSubmit={e => { e.preventDefault(); setView('login') }}>
              <label>
                الاسم الكامل
                <input type="text" placeholder="اسمك أو اسم الشركة" />
              </label>
              <label>
                البريد الإلكتروني
                <input type="email" placeholder="example@mail.com" />
              </label>
              <label>
                نوع الحساب
                <select>
                  <option>مقاول</option>
                  <option>صاحب معدات</option>
                </select>
              </label>
              <label>
                كلمة المرور
                <input type="password" placeholder="••••••" />
              </label>
              <label>
                تأكيد كلمة المرور
                <input type="password" placeholder="••••••" />
              </label>
              <button type="submit" className="btn primary">إنشاء الحساب</button>
              <p className="form-note">
                لديك حساب؟{' '}
                <button type="button" className="link-btn" onClick={() => setView('login')}>تسجيل الدخول</button>
              </p>
            </form>
          </section>
        )}

        {/* ─── CONTRACTOR ───────────────────────────── */}
        {view === 'contractor' && (
          <section className="section">
            <div className="section-head">
              <div>
                <h2>لوحة المقاول</h2>
                <p>مرحباً {currentUser?.name || 'مقاول'}</p>
              </div>
              <button type="button" className="btn primary" onClick={() => setView('catalogue')}>+ البحث عن معدات</button>
            </div>

            <div className="tabs">
              {[
                { id: 'overview', label: 'نظرة عامة' },
                { id: 'requests', label: `طلباتي (${contractorRequests.length})` },
                { id: 'messages', label: 'الرسائل' },
                { id: 'ratings', label: 'التقييمات' },
              ].map(t => (
                <button key={t.id} type="button" className={contractorTab === t.id ? 'tab-btn active' : 'tab-btn'} onClick={() => setContractorTab(t.id)}>
                  {t.label}
                </button>
              ))}
            </div>

            {contractorTab === 'overview' && (
              <div className="stats small tab-content">
                <div className="stat-card"><strong>{contractorRequests.length}</strong><span>عدد الطلبات</span></div>
                <div className="stat-card success"><strong>{contractorRequests.filter(r => r.status === 'مقبول').length}</strong><span>طلبات مقبولة</span></div>
                <div className="stat-card warn"><strong>{contractorRequests.filter(r => r.status === 'قيد الدراسة').length}</strong><span>طلبات معلقة</span></div>
                <div className="stat-card"><strong>{equipment.filter(e => e.available).length}</strong><span>معدات متاحة</span></div>
              </div>
            )}

            {contractorTab === 'requests' && (
              <div className="panel tab-content">
                <h3>طلباتي الجارية والسابقة</h3>
                {contractorRequests.length === 0 ? (
                  <div className="empty-state">
                    <p>لا توجد طلبات بعد.</p>
                    <button type="button" className="btn primary" onClick={() => setView('catalogue')}>تصفح المعدات</button>
                  </div>
                ) : (
                  <div className="table">
                    <div className="table-head">
                      <span>المعدة</span>
                      <span>الحالة</span>
                      <span>المدة × الكمية</span>
                      <span>الإجمالي</span>
                      <span>التاريخ</span>
                    </div>
                    {contractorRequests.map(r => (
                      <div key={r.id} className="row">
                        <span className="cell-name">{getEquipName(r.equipmentId)}</span>
                        <StatusBadge status={r.status} />
                        <span>{r.duration} أيام × {r.quantity}</span>
                        <span className="cell-price">{r.total} د.ت</span>
                        <span className="text-muted">{r.createdAt}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {contractorTab === 'messages' && (
              <div className="panel tab-content">
                <h3>الرسائل</h3>
                {contractorRequests.length === 0 ? (
                  <p className="text-muted">أرسل طلب كراء أولاً للتواصل مع المزودين.</p>
                ) : (
                  <>
                    <div className="msg-select">
                      <label>اختر الطلب:</label>
                      <select value={activeMessageRequest} onChange={e => setActiveMessageRequest(e.target.value)}>
                        {contractorRequests.map(r => (
                          <option key={r.id} value={r.id}>
                            {getEquipName(r.equipmentId)} — {r.status}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="chat">
                      {messages.filter(m => m.requestId === activeMessageRequest).length === 0 ? (
                        <p className="chat-empty">لا توجد رسائل بعد. ابدأ المحادثة.</p>
                      ) : (
                        messages.filter(m => m.requestId === activeMessageRequest).map(m => (
                          <div key={m.id} className={`bubble ${m.from === 'u-contractor' ? 'mine' : 'theirs'}`}>
                            <p>{m.text}</p>
                            <small>{m.from === 'u-contractor' ? 'أنت' : getUserName(m.from)} · {m.date}</small>
                          </div>
                        ))
                      )}
                    </div>
                    <div className="msg-compose">
                      <input
                        type="text"
                        placeholder="اكتب رسالتك..."
                        value={messageText}
                        onChange={e => setMessageText(e.target.value)}
                        onKeyDown={e => e.key === 'Enter' && handleSendMessage()}
                      />
                      <button type="button" className="btn primary" onClick={handleSendMessage}>إرسال</button>
                    </div>
                  </>
                )}
              </div>
            )}

            {contractorTab === 'ratings' && (
              <div className="panel tab-content">
                <h3>تقييم الخدمات</h3>
                {contractorRequests.filter(r => r.status === 'مقبول').length === 0 ? (
                  <p className="text-muted">لا توجد طلبات مقبولة للتقييم بعد.</p>
                ) : (
                  contractorRequests.filter(r => r.status === 'مقبول').map(r => {
                    const existing = ratings.find(rt => rt.requestId === r.id)
                    return (
                      <div key={r.id} className="rating-row">
                        <div>
                          <p className="rating-name">{getEquipName(r.equipmentId)}</p>
                          <small className="text-muted">{r.createdAt}</small>
                        </div>
                        <div className="rating-action">
                          <Stars score={existing?.score || 0} onRate={!existing ? (s) => handleRate(r.id, s) : undefined} />
                          {existing
                            ? <small className="badge-ok" style={{ padding: '2px 8px', borderRadius: 999 }}>تم التقييم: {existing.score}/5</small>
                            : <small className="text-muted">انقر على النجوم للتقييم</small>
                          }
                        </div>
                      </div>
                    )
                  })
                )}
              </div>
            )}
          </section>
        )}

        {/* ─── PROVIDER ─────────────────────────────── */}
        {view === 'provider' && (
          <section className="section">
            <div className="section-head">
              <div>
                <h2>لوحة صاحب المعدات</h2>
                <p>مرحباً {currentUser?.name || 'مزود'}</p>
              </div>
            </div>

            <div className="tabs">
              {[
                { id: 'overview', label: 'نظرة عامة' },
                { id: 'equipment', label: 'إدارة المعدات' },
                { id: 'requests', label: `الطلبات (${providerRequests.length})` },
                { id: 'bookings', label: 'الحجوزات والتقييمات' },
              ].map(t => (
                <button key={t.id} type="button" className={providerTab === t.id ? 'tab-btn active' : 'tab-btn'} onClick={() => setProviderTab(t.id)}>
                  {t.label}
                </button>
              ))}
            </div>

            {providerTab === 'overview' && (
              <div className="stats small tab-content">
                <div className="stat-card"><strong>{equipment.filter(e => e.ownerId === 'u-provider').length}</strong><span>عدد المعدات</span></div>
                <div className="stat-card"><strong>{providerRequests.length}</strong><span>عدد الطلبات</span></div>
                <div className="stat-card success"><strong>{providerRequests.filter(r => r.status === 'مقبول').length}</strong><span>الحجوزات الحالية</span></div>
                <div className="stat-card"><strong>{providerRevenue} د.ت</strong><span>الإيرادات</span></div>
              </div>
            )}

            {providerTab === 'equipment' && (
              <div className="split tab-content">
                <div className="card">
                  <h3>{equipmentForm.id ? 'تعديل معدة' : 'إضافة معدة جديدة'}</h3>
                  <form className="form compact" onSubmit={handleSaveEquipment}>
                    <label>
                      اسم المعدة
                      <input type="text" value={equipmentForm.name} placeholder="مثال: كوفراج تونال مرن"
                        onChange={e => setEquipmentForm({ ...equipmentForm, name: e.target.value })} />
                    </label>
                    <label>
                      النوع
                      <select value={equipmentForm.type}
                        onChange={e => setEquipmentForm({ ...equipmentForm, type: e.target.value })}>
                        {TYPES.map(t => <option key={t}>{t}</option>)}
                      </select>
                    </label>
                    <div className="form-row">
                      <label>
                        السعر / يوم (د.ت)
                        <input type="number" min="1" value={equipmentForm.price}
                          onChange={e => setEquipmentForm({ ...equipmentForm, price: e.target.value })} />
                      </label>
                      <label>
                        الكمية المتاحة
                        <input type="number" min="1" value={equipmentForm.quantity}
                          onChange={e => setEquipmentForm({ ...equipmentForm, quantity: e.target.value })} />
                      </label>
                    </div>
                    <label>
                      الولاية
                      <select value={equipmentForm.region}
                        onChange={e => setEquipmentForm({ ...equipmentForm, region: e.target.value })}>
                        {REGIONS.map(r => <option key={r}>{r}</option>)}
                      </select>
                    </label>
                    <label>
                      الوصف
                      <textarea rows="3" value={equipmentForm.description} placeholder="وصف مختصر للمعدة..."
                        onChange={e => setEquipmentForm({ ...equipmentForm, description: e.target.value })} />
                    </label>
                    <div className="button-row">
                      <button type="submit" className="btn primary">
                        {equipmentForm.id ? 'تحديث المعدة' : 'إضافة المعدة'}
                      </button>
                      {equipmentForm.id && (
                        <button type="button" className="btn ghost"
                          onClick={() => setEquipmentForm({ id: '', name: '', type: 'تونال معدني', price: 150, region: 'تونس', quantity: 5, description: '' })}>
                          إلغاء
                        </button>
                      )}
                    </div>
                  </form>
                </div>

                <div className="card">
                  <h3>معداتي ({equipment.filter(e => e.ownerId === 'u-provider').length})</h3>
                  <div className="table">
                    {equipment.filter(e => e.ownerId === 'u-provider').map(item => (
                      <div key={item.id} className="equip-row">
                        <img src={item.image} alt={item.name} className="table-img" />
                        <div className="equip-row-info">
                          <p className="equip-row-name">{item.name}</p>
                          <p className="text-muted">{item.price} د.ت · {item.region}</p>
                          <AvailBadge available={item.available} />
                        </div>
                        <div className="actions">
                          <button type="button" className="chip" onClick={() => handleToggleAvailability(item.id)}>
                            {item.available ? 'إيقاف' : 'تفعيل'}
                          </button>
                          <button type="button" className="chip" onClick={() => handleEditEquipment(item)}>تعديل</button>
                          <button type="button" className="chip danger" onClick={() => handleDeleteEquipment(item.id)}>حذف</button>
                        </div>
                      </div>
                    ))}
                    {equipment.filter(e => e.ownerId === 'u-provider').length === 0 && (
                      <p className="text-muted">لا توجد معدات بعد. أضف معدتك الأولى.</p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {providerTab === 'requests' && (
              <div className="panel tab-content">
                <h3>الطلبات الواردة</h3>
                {providerRequests.length === 0 ? (
                  <p className="text-muted">لا توجد طلبات واردة بعد.</p>
                ) : (
                  <div className="table">
                    {providerRequests.map(r => (
                      <div key={r.id} className="row row-actions">
                        <div>
                          <p className="cell-name">{getEquipName(r.equipmentId)}</p>
                          <small className="text-muted">{getUserName(r.contractorId)}</small>
                        </div>
                        <span>{r.duration} أيام × {r.quantity}</span>
                        <span className="cell-price">{r.total} د.ت</span>
                        <StatusBadge status={r.status} />
                        <div className="actions">
                          {r.status === 'قيد الدراسة' && (
                            <>
                              <button type="button" className="chip ok" onClick={() => handleRequestStatus(r.id, 'مقبول')}>✓ قبول</button>
                              <button type="button" className="chip danger" onClick={() => handleRequestStatus(r.id, 'مرفوض')}>✕ رفض</button>
                            </>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {providerTab === 'bookings' && (
              <div className="panel tab-content">
                <h3>الحجوزات الحالية</h3>
                <div className="table">
                  {providerRequests.filter(r => r.status === 'مقبول').map(r => (
                    <div key={r.id} className="row">
                      <span className="cell-name">{getEquipName(r.equipmentId)}</span>
                      <span>{getUserName(r.contractorId)}</span>
                      <span>{r.duration} أيام</span>
                      <span className="cell-price">{r.total} د.ت</span>
                      <StatusBadge status={r.status} />
                    </div>
                  ))}
                  {providerRequests.filter(r => r.status === 'مقبول').length === 0 && (
                    <p className="text-muted">لا توجد حجوزات حالية.</p>
                  )}
                </div>

                <h3 style={{ marginTop: 24 }}>الحجوزات السابقة</h3>
                <div className="table">
                  {providerRequests.filter(r => r.status === 'مرفوض').map(r => (
                    <div key={r.id} className="row">
                      <span className="cell-name">{getEquipName(r.equipmentId)}</span>
                      <span>{getUserName(r.contractorId)}</span>
                      <StatusBadge status={r.status} />
                    </div>
                  ))}
                  {providerRequests.filter(r => r.status === 'مرفوض').length === 0 && (
                    <p className="text-muted">لا توجد حجوزات مرفوضة.</p>
                  )}
                </div>

                <h3 style={{ marginTop: 24 }}>تقييمات العملاء</h3>
                {ratings.filter(rt => {
                  const req = requests.find(r => r.id === rt.requestId)
                  return req?.providerId === 'u-provider'
                }).map(rt => {
                  const req = requests.find(r => r.id === rt.requestId)
                  return (
                    <div key={rt.requestId} className="rating-row">
                      <div>
                        <p className="rating-name">{getEquipName(req?.equipmentId)}</p>
                        <small className="text-muted">{rt.date}</small>
                      </div>
                      <Stars score={rt.score} />
                    </div>
                  )
                })}
                {ratings.filter(rt => {
                  const req = requests.find(r => r.id === rt.requestId)
                  return req?.providerId === 'u-provider'
                }).length === 0 && (
                  <p className="text-muted">لا توجد تقييمات بعد.</p>
                )}
              </div>
            )}
          </section>
        )}

        {/* ─── ADMIN ────────────────────────────────── */}
        {view === 'admin' && (
          <section className="section">
            <div className="section-head">
              <div>
                <h2>لوحة الإدارة</h2>
                <p>مؤشرات الأداء وإدارة المنصة</p>
              </div>
            </div>

            <div className="stats">
              {[
                { num: users.length, label: 'عدد المستخدمين' },
                { num: users.filter(u => u.role === 'contractor').length, label: 'المقاولون' },
                { num: users.filter(u => u.role === 'provider').length, label: 'أصحاب المعدات' },
                { num: equipment.length, label: 'عدد المعدات' },
                { num: requests.length, label: 'عمليات الكراء' },
                { num: `${requests.reduce((s, r) => s + r.total, 0)} د.ت`, label: 'إجمالي العمولات' },
              ].map(s => (
                <div key={s.label} className="stat-card">
                  <strong>{s.num}</strong>
                  <span>{s.label}</span>
                </div>
              ))}
            </div>

            <div className="split" style={{ marginTop: 24 }}>
              <div className="card">
                <h3>إدارة المستخدمين</h3>
                <div className="table">
                  {users.map(u => (
                    <div key={u.id} className="row row-actions">
                      <span className="cell-name">{u.name}</span>
                      <span>{u.role === 'contractor' ? 'مقاول' : u.role === 'provider' ? 'مزود' : 'مدير'}</span>
                      <span className={`avail-badge ${u.active ? 'av-yes' : 'av-no'}`}>{u.active ? 'نشط' : 'معطل'}</span>
                      {u.role !== 'admin' && (
                        <button type="button" className="chip" onClick={() => handleToggleUser(u.id)}>
                          {u.active ? 'تعطيل' : 'تفعيل'}
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
              <div className="card">
                <h3>إدارة المعدات</h3>
                <div className="table">
                  {equipment.map(item => (
                    <div key={item.id} className="equip-row">
                      <img src={item.image} alt={item.name} className="table-img" />
                      <div className="equip-row-info">
                        <p className="equip-row-name">{item.name}</p>
                        <small className="text-muted">{item.region} · {item.ownerName}</small>
                      </div>
                      <button type="button" className="chip danger" onClick={() => handleDeleteEquipment(item.id)}>حذف</button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="panel" style={{ marginTop: 16 }}>
              <h3>إدارة الطلبات وعمليات الكراء</h3>
              <div className="table">
                <div className="table-head">
                  <span>المعدة</span>
                  <span>المقاول</span>
                  <span>الحالة</span>
                  <span>القيمة</span>
                  <span>عمولة المنصة (5%)</span>
                  <span>التاريخ</span>
                </div>
                {requests.map(r => (
                  <div key={r.id} className="row">
                    <span>{getEquipName(r.equipmentId)}</span>
                    <span>{getUserName(r.contractorId)}</span>
                    <StatusBadge status={r.status} />
                    <span>{r.total} د.ت</span>
                    <span className="text-muted">{Math.round(r.total * 0.05)} د.ت</span>
                    <span className="text-muted">{r.createdAt}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="panel" style={{ marginTop: 16 }}>
              <h3>الإحصائيات الشهرية</h3>
              <div className="chart">
                {[
                  { label: 'جانفي', value: 40 },
                  { label: 'فيفري', value: 55 },
                  { label: 'مارس', value: 65 },
                  { label: 'أفريل', value: 48 },
                  { label: 'ماي', value: 72 },
                  { label: 'جوان', value: 60 },
                ].map(bar => (
                  <div key={bar.label} className="bar">
                    <small>{bar.value}</small>
                    <div style={{ height: `${bar.value}%` }} />
                    <span>{bar.label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="split" style={{ marginTop: 16 }}>
              <div className="panel">
                <h3>أكثر المعدات طلباً</h3>
                <div className="table">
                  {[
                    { name: 'كوفراج تونال معدني', count: 45 },
                    { name: 'كوفراج أعمدة', count: 32 },
                    { name: 'قواعد صب', count: 28 },
                    { name: 'منصات عمل', count: 20 },
                  ].map(item => (
                    <div key={item.name} className="row">
                      <span>{item.name}</span>
                      <div className="mini-bar">
                        <div style={{ width: `${(item.count / 45) * 100}%` }} />
                      </div>
                      <span className="text-muted">{item.count} طلب</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="panel">
                <h3>الولايات الأكثر نشاطاً</h3>
                <div className="stats small">
                  {[
                    { region: 'تونس', count: 120 },
                    { region: 'سوسة', count: 85 },
                    { region: 'صفاقس', count: 70 },
                    { region: 'نابل', count: 45 },
                  ].map(r => (
                    <div key={r.region} className="stat-card">
                      <strong>{r.count}</strong>
                      <span>{r.region}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}
      </main>

      <footer className="footer">
        <div className="footer-brand">
          <div className="brand-badge" style={{ width: 40, height: 40, fontSize: 14 }}>كوفراج</div>
          <p>منصة تونسية لرقمنة كراء الكوفراج ومعدات البناء.</p>
        </div>
        <div>
          <h4>روابط سريعة</h4>
          <ul className="footer-links">
            <li><button type="button" className="link-btn" onClick={() => setView('home')}>الرئيسية</button></li>
            <li><button type="button" className="link-btn" onClick={() => setView('catalogue')}>المعدات</button></li>
            <li><button type="button" className="link-btn" onClick={() => setView('signup')}>إنشاء حساب</button></li>
          </ul>
        </div>
        <div>
          <h4>اتصل بنا</h4>
          <p>البريد الإلكتروني: contact@kofraj.tn</p>
          <p>الهاتف: 70 000 000</p>
        </div>
        <div>
          <h4>الشروط والأحكام</h4>
          <p>سياسة الاستخدام والخصوصية.</p>
          <p className="text-muted" style={{ fontSize: 12, marginTop: 8 }}>© 2026 منصة كوفراج تونال</p>
        </div>
      </footer>
    </div>
  )
}

export default App
