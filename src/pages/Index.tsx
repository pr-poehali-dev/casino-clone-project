import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Progress } from '@/components/ui/progress'
import { Toast } from '@/components/ui/toast'
import { useToast } from '@/hooks/use-toast'
import Icon from '@/components/ui/icon'

const Index = () => {
  const [chatOpen, setChatOpen] = useState(false)
  const [loginOpen, setLoginOpen] = useState(false)
  const [registerOpen, setRegisterOpen] = useState(false)
  const [gameOpen, setGameOpen] = useState(false)
  const [selectedGame, setSelectedGame] = useState<any>(null)
  const [activeTab, setActiveTab] = useState('slots')
  const [balance, setBalance] = useState(50000)
  const [jackpotAmount, setJackpotAmount] = useState(15247892)
  const [onlineUsers, setOnlineUsers] = useState(24847)
  const { toast } = useToast()

  const [messages, setMessages] = useState([
    { id: 1, text: 'Добро пожаловать в службу поддержки! Как могу помочь?', isSupport: true, time: '14:20' }
  ])
  const [newMessage, setNewMessage] = useState('')

  // Animate counters
  useEffect(() => {
    const interval = setInterval(() => {
      setJackpotAmount(prev => prev + Math.floor(Math.random() * 1000))
      setOnlineUsers(prev => prev + Math.floor(Math.random() * 10) - 5)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  const sendMessage = () => {
    if (!newMessage.trim()) return
    setMessages(prev => [...prev, {
      id: prev.length + 1,
      text: newMessage,
      isSupport: false,
      time: new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })
    }])
    setNewMessage('')
    
    // Simulate support response
    setTimeout(() => {
      const responses = [
        'Спасибо за обращение! Изучаю ваш вопрос.',
        'Сейчас помогу разобраться с этим вопросом.',
        'Проверяю информацию в системе...',
        'Готово! Ваш вопрос решен.',
      ]
      setMessages(prev => [...prev, {
        id: prev.length + 2,
        text: responses[Math.floor(Math.random() * responses.length)],
        isSupport: true,
        time: new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })
      }])
    }, 2000)
  }

  const handleLogin = () => {
    toast({
      title: "Успешный вход!",
      description: "Добро пожаловать в ROYALE CASINO",
    })
    setLoginOpen(false)
  }

  const handleRegister = () => {
    toast({
      title: "Регистрация завершена!",
      description: "Добро пожаловать! Получите приветственный бонус 50,000₽",
    })
    setBalance(100000)
    setRegisterOpen(false)
  }

  const handleGamePlay = (game: any) => {
    setSelectedGame(game)
    setGameOpen(true)
  }

  const handleGameSpin = () => {
    const bet = Math.floor(Math.random() * 5000) + 100
    const win = Math.random() > 0.6 ? bet * (Math.random() * 3 + 1) : 0
    
    if (win > 0) {
      setBalance(prev => prev + Math.floor(win))
      toast({
        title: "🎉 ВЫИГРЫШ!",
        description: `Вы выиграли ${Math.floor(win)}₽!`,
      })
    } else {
      setBalance(prev => Math.max(0, prev - bet))
      toast({
        title: "Попробуйте еще раз",
        description: `Ставка ${bet}₽. Удача рядом!`,
      })
    }
  }

  const handlePromoActivate = (code: string) => {
    const bonuses = {
      'WELCOME100': 50000,
      'WEEKEND50': 25000,
      'VIPCASH': 15000
    }
    
    const bonus = bonuses[code as keyof typeof bonuses]
    setBalance(prev => prev + bonus)
    toast({
      title: "🎁 Промокод активирован!",
      description: `Вы получили бонус ${bonus}₽`,
    })
  }

  const gameCategories = [
    {
      id: 'slots',
      title: 'Слоты',
      icon: 'Sparkles',
      count: '500+',
      gradient: 'from-red-600 via-red-500 to-orange-500',
      games: [
        { id: 1, name: 'Book of Dead', provider: 'Play\'n GO', jackpot: '₽1,250,000', rtp: '96.21%' },
        { id: 2, name: 'Starburst', provider: 'NetEnt', jackpot: '₽850,000', rtp: '96.09%' },
        { id: 3, name: 'Sweet Bonanza', provider: 'Pragmatic Play', jackpot: '₽2,100,000', rtp: '96.48%' }
      ]
    },
    {
      id: 'roulette',
      title: 'Рулетка',
      icon: 'RotateCw',
      count: '15+',
      gradient: 'from-amber-500 via-yellow-500 to-orange-400',
      games: [
        { id: 4, name: 'European Roulette', provider: 'Evolution', jackpot: 'Live', rtp: '97.30%' },
        { id: 5, name: 'Lightning Roulette', provider: 'Evolution', jackpot: 'Live', rtp: '97.10%' },
        { id: 6, name: 'Russian Roulette', provider: 'Authentic Gaming', jackpot: 'Live', rtp: '97.30%' }
      ]
    },
    {
      id: 'poker',
      title: 'Покер',
      icon: 'Spade',
      count: '25+',
      gradient: 'from-purple-600 via-purple-500 to-indigo-500',
      games: [
        { id: 7, name: 'Texas Hold\'em', provider: 'PokerStars', jackpot: '₽5,000,000', rtp: '98.50%' },
        { id: 8, name: 'Caribbean Stud', provider: 'Evolution', jackpot: 'Live', rtp: '94.78%' },
        { id: 9, name: 'Three Card Poker', provider: 'Playtech', jackpot: '₽750,000', rtp: '96.63%' }
      ]
    },
    {
      id: 'sports',
      title: 'Спорт',
      icon: 'Trophy',
      count: '1000+',
      gradient: 'from-green-600 via-emerald-500 to-teal-500',
      games: [
        { id: 10, name: 'Футбол', provider: 'Live', jackpot: '₽10,000,000+', rtp: '95.00%' },
        { id: 11, name: 'Хоккей', provider: 'Live', jackpot: '₽5,000,000+', rtp: '94.50%' },
        { id: 12, name: 'Баскетбол', provider: 'Live', jackpot: '₽8,000,000+', rtp: '94.80%' }
      ]
    }
  ]

  const promoOffers = [
    {
      title: 'Добро пожаловать!',
      description: 'Бонус 100% до ₽50,000 + 250 фриспинов',
      code: 'WELCOME100',
      color: 'from-red-600 to-pink-600',
      gradient: true
    },
    {
      title: 'Weekend Reload',
      description: 'Бонус 50% каждые выходные',
      code: 'WEEKEND50',
      color: 'from-amber-500 to-orange-500',
      gradient: true
    },
    {
      title: 'VIP Cashback',
      description: 'До 20% возврата средств каждую неделю',
      code: 'VIPCASH',
      color: 'from-purple-600 to-blue-600',
      gradient: true
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white">
      {/* Header */}
      <header className="border-b border-gray-800 bg-black/80 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-red-500 rounded-full flex items-center justify-center">
                <Icon name="Crown" className="text-black" size={20} />
              </div>
              <h1 className="text-2xl font-casino font-bold bg-gradient-to-r from-yellow-400 to-red-500 bg-clip-text text-transparent">ROYALE</h1>
            </div>
            <Badge className="bg-red-600 text-white animate-pulse">LIVE</Badge>
            <div className="hidden md:flex items-center text-sm text-gray-400">
              <Icon name="Users" size={16} className="mr-1" />
              {onlineUsers.toLocaleString()} онлайн
            </div>
          </div>
          
          <nav className="hidden md:flex space-x-1">
            {['Главная', 'Слоты', 'Рулетка', 'Покер', 'Спорт', 'Промо'].map((item, index) => (
              <Button 
                key={item}
                variant="ghost" 
                className="text-gray-300 hover:text-yellow-400 hover:bg-gray-800/50 transition-all duration-200"
                onClick={() => {
                  if (item === 'Слоты') setActiveTab('slots')
                  else if (item === 'Рулетка') setActiveTab('roulette')
                  else if (item === 'Покер') setActiveTab('poker')
                  else if (item === 'Спорт') setActiveTab('sports')
                  document.getElementById(item.toLowerCase())?.scrollIntoView({ behavior: 'smooth' })
                }}
              >
                {item}
              </Button>
            ))}
          </nav>

          <div className="flex items-center space-x-3">
            <div className="hidden md:flex items-center bg-gray-800 rounded-lg px-3 py-1 text-sm">
              <Icon name="Wallet" size={16} className="text-yellow-400 mr-1" />
              <span className="text-yellow-400 font-semibold">{balance.toLocaleString()}₽</span>
            </div>
            <Button 
              className="bg-gradient-to-r from-yellow-400 to-red-500 text-black font-semibold hover:from-yellow-300 hover:to-red-400 transition-all duration-200"
              onClick={() => setLoginOpen(true)}
            >
              Войти
            </Button>
            <Button 
              variant="outline" 
              className="border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black transition-all duration-200"
              onClick={() => setRegisterOpen(true)}
            >
              Регистрация
            </Button>
          </div>
        </div>
      </header>

      {/* Jackpot Ticker */}
      <div className="bg-gradient-to-r from-red-600 via-yellow-500 to-red-600 py-2">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <span className="text-black font-bold text-lg animate-pulse">
              🎰 ПРОГРЕССИВНЫЙ ДЖЕКПОТ: {jackpotAmount.toLocaleString()}₽ 🎰
            </span>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-red-900/20 via-purple-900/20 to-blue-900/20"></div>
        <div className="absolute inset-0 opacity-10" style={{backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23fbbf24' fill-opacity='0.3'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")"}}></div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-5xl md:text-7xl font-casino font-bold mb-6 animate-fade-in">
            Добро пожаловать в
            <span className="block text-transparent bg-gradient-to-r from-yellow-400 via-red-500 to-purple-600 bg-clip-text animate-pulse"> ROYALE CASINO</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8 animate-fade-in">
            Элитное онлайн-казино с играми мирового класса, невероятными джекпотами и VIP-обслуживанием
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button 
              className="bg-gradient-to-r from-red-600 to-pink-600 text-white text-lg px-8 py-3 hover:from-red-500 hover:to-pink-500 transform hover:scale-105 transition-all duration-200 shadow-lg shadow-red-500/25"
              onClick={() => setActiveTab('slots')}
            >
              <Icon name="Play" className="mr-2" />
              Начать играть
            </Button>
            <Button 
              variant="outline" 
              className="border-yellow-400 text-yellow-400 text-lg px-8 py-3 hover:bg-yellow-400 hover:text-black transform hover:scale-105 transition-all duration-200"
              onClick={() => handlePromoActivate('WELCOME100')}
            >
              <Icon name="Gift" className="mr-2" />
              Получить бонус
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {[
              { label: 'Игроков онлайн', value: onlineUsers.toLocaleString(), icon: 'Users', color: 'text-green-400' },
              { label: 'Выигрышей сегодня', value: '₽15.2M', icon: 'TrendingUp', color: 'text-yellow-400' },
              { label: 'Игр доступно', value: '2,500+', icon: 'Gamepad2', color: 'text-purple-400' },
              { label: 'Средняя выплата', value: '97.8%', icon: 'Percent', color: 'text-blue-400' }
            ].map((stat, index) => (
              <Card key={index} className="bg-gray-900/60 border-gray-700 backdrop-blur-sm hover:bg-gray-800/60 transition-all duration-200">
                <CardContent className="p-4 text-center">
                  <Icon name={stat.icon} className={`mx-auto mb-2 ${stat.color}`} size={24} />
                  <p className="text-2xl font-bold text-white">{stat.value}</p>
                  <p className="text-gray-400 text-sm">{stat.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Game Categories */}
      <section id="games" className="py-16 bg-gray-900/50">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-casino font-bold text-center mb-12">
            Популярные категории игр
          </h3>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-4 bg-gray-800 border border-gray-700 mb-8">
              {gameCategories.map(category => (
                <TabsTrigger 
                  key={category.id}
                  value={category.id} 
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-yellow-400 data-[state=active]:to-red-500 data-[state=active]:text-black font-semibold"
                >
                  <Icon name={category.icon} className="mr-2" size={16} />
                  {category.title}
                </TabsTrigger>
              ))}
            </TabsList>

            {gameCategories.map((category) => (
              <TabsContent key={category.id} value={category.id}>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {category.games.map((game) => (
                    <Card 
                      key={game.id} 
                      className="bg-gray-800 border-gray-700 hover:border-yellow-400 transition-all duration-300 hover:scale-105 cursor-pointer group overflow-hidden"
                      onClick={() => handleGamePlay(game)}
                    >
                      <CardContent className="p-6 relative">
                        <div className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
                        <div className="relative z-10">
                          <div className="flex items-center justify-between mb-4">
                            <div>
                              <h4 className="text-lg font-semibold text-white group-hover:text-yellow-400 transition-colors">{game.name}</h4>
                              <p className="text-gray-400 text-sm">{game.provider}</p>
                              <p className="text-green-400 text-xs">RTP: {game.rtp}</p>
                            </div>
                            <Icon name={category.icon} className="text-yellow-400 group-hover:scale-110 transition-transform" size={32} />
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-yellow-400 font-semibold">{game.jackpot}</span>
                            <Button size="sm" className="bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-500 hover:to-pink-500 transition-all duration-200">
                              Играть
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      {/* Promo Section */}
      <section id="promo" className="py-16 bg-gradient-to-br from-gray-900 to-black">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-casino font-bold text-center mb-12">
            Эксклюзивные предложения
          </h3>
          
          <div className="grid md:grid-cols-3 gap-6">
            {promoOffers.map((offer, index) => (
              <Card key={index} className="border-0 text-white hover:scale-105 transition-transform duration-300 overflow-hidden">
                <div className={`bg-gradient-to-br ${offer.color} p-6`}>
                  <h4 className="text-xl font-bold mb-3">{offer.title}</h4>
                  <p className="mb-4 opacity-90">{offer.description}</p>
                  <div className="flex items-center justify-between">
                    <code className="bg-black/20 px-2 py-1 rounded text-sm">{offer.code}</code>
                    <Button 
                      variant="secondary" 
                      size="sm" 
                      className="bg-white/20 hover:bg-white/30 transition-all duration-200"
                      onClick={() => handlePromoActivate(offer.code)}
                    >
                      Получить
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Login Modal */}
      <Dialog open={loginOpen} onOpenChange={setLoginOpen}>
        <DialogContent className="bg-gray-900 border-gray-700 text-white">
          <DialogHeader>
            <DialogTitle className="text-yellow-400 text-xl font-casino">Вход в аккаунт</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Input placeholder="Email или телефон" className="bg-gray-800 border-gray-600 text-white" />
            <Input placeholder="Пароль" type="password" className="bg-gray-800 border-gray-600 text-white" />
            <Button 
              className="w-full bg-gradient-to-r from-yellow-400 to-red-500 text-black font-semibold hover:from-yellow-300 hover:to-red-400"
              onClick={handleLogin}
            >
              Войти
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Register Modal */}
      <Dialog open={registerOpen} onOpenChange={setRegisterOpen}>
        <DialogContent className="bg-gray-900 border-gray-700 text-white">
          <DialogHeader>
            <DialogTitle className="text-yellow-400 text-xl font-casino">Регистрация</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Input placeholder="Имя" className="bg-gray-800 border-gray-600 text-white" />
            <Input placeholder="Email" className="bg-gray-800 border-gray-600 text-white" />
            <Input placeholder="Телефон" className="bg-gray-800 border-gray-600 text-white" />
            <Input placeholder="Пароль" type="password" className="bg-gray-800 border-gray-600 text-white" />
            <Button 
              className="w-full bg-gradient-to-r from-green-500 to-blue-500 text-white font-semibold hover:from-green-400 hover:to-blue-400"
              onClick={handleRegister}
            >
              Зарегистрироваться
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Game Modal */}
      <Dialog open={gameOpen} onOpenChange={setGameOpen}>
        <DialogContent className="bg-gray-900 border-gray-700 text-white max-w-md">
          <DialogHeader>
            <DialogTitle className="text-yellow-400 text-xl font-casino">
              {selectedGame?.name}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-6">
            <div className="text-center">
              <div className="w-32 h-32 bg-gradient-to-br from-yellow-400 to-red-500 rounded-lg mx-auto mb-4 flex items-center justify-center">
                <Icon name="Sparkles" size={48} className="text-black" />
              </div>
              <p className="text-gray-300">Провайдер: {selectedGame?.provider}</p>
              <p className="text-green-400">RTP: {selectedGame?.rtp}</p>
              <p className="text-yellow-400 font-bold text-lg">Джекпот: {selectedGame?.jackpot}</p>
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span>Ваш баланс:</span>
                <span className="text-yellow-400 font-semibold">{balance.toLocaleString()}₽</span>
              </div>
              <Progress value={75} className="h-2" />
              <p className="text-xs text-gray-400 text-center">До следующего уровня VIP</p>
            </div>
            
            <Button 
              className="w-full bg-gradient-to-r from-red-600 to-pink-600 text-white font-bold text-lg py-3 hover:from-red-500 hover:to-pink-500 transition-all duration-200"
              onClick={handleGameSpin}
            >
              🎰 КРУТИТЬ (от 100₽)
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Live Chat Button & Modal */}
      <Dialog open={chatOpen} onOpenChange={setChatOpen}>
        <DialogTrigger asChild>
          <Button 
            className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-400 hover:to-purple-500 shadow-lg shadow-blue-500/25 z-50 animate-bounce"
            size="icon"
          >
            <Icon name="MessageCircle" size={24} />
          </Button>
        </DialogTrigger>
        
        <DialogContent className="bg-gray-900 border-gray-700 text-white max-w-md">
          <DialogHeader>
            <DialogTitle className="text-yellow-400 flex items-center">
              <div className="w-3 h-3 bg-green-400 rounded-full mr-2 animate-pulse"></div>
              Поддержка онлайн
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="h-64 overflow-y-auto space-y-3 p-3 bg-gray-800 rounded border border-gray-600">
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.isSupport ? 'justify-start' : 'justify-end'}`}>
                  <div className={`max-w-[80%] p-2 rounded-lg ${
                    message.isSupport 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-yellow-400 text-black'
                  }`}>
                    <p className="text-sm">{message.text}</p>
                    <p className="text-xs opacity-70 mt-1">{message.time}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="flex space-x-2">
              <Input
                placeholder="Ваше сообщение..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                className="bg-gray-800 border-gray-600 text-white"
              />
              <Button 
                onClick={sendMessage} 
                className="bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-400 hover:to-purple-500"
              >
                <Icon name="Send" size={16} />
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Footer */}
      <footer className="bg-black border-t border-gray-800 py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-red-500 rounded-full flex items-center justify-center">
                  <Icon name="Crown" className="text-black" size={16} />
                </div>
                <h4 className="text-yellow-400 font-casino font-bold text-lg">ROYALE CASINO</h4>
              </div>
              <p className="text-gray-400 text-sm">
                Лицензированное онлайн-казино премиум-класса с играми от лучших провайдеров мира.
              </p>
              <div className="flex space-x-2 mt-4">
                <Badge className="bg-green-600">Лицензия</Badge>
                <Badge className="bg-blue-600">SSL</Badge>
                <Badge className="bg-purple-600">18+</Badge>
              </div>
            </div>
            
            <div>
              <h5 className="text-white font-semibold mb-3">Игры</h5>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><Button variant="ghost" className="p-0 h-auto text-gray-400 hover:text-yellow-400" onClick={() => setActiveTab('slots')}>Слоты</Button></li>
                <li><Button variant="ghost" className="p-0 h-auto text-gray-400 hover:text-yellow-400" onClick={() => setActiveTab('roulette')}>Рулетка</Button></li>
                <li><Button variant="ghost" className="p-0 h-auto text-gray-400 hover:text-yellow-400" onClick={() => setActiveTab('poker')}>Покер</Button></li>
                <li><Button variant="ghost" className="p-0 h-auto text-gray-400 hover:text-yellow-400" onClick={() => setActiveTab('sports')}>Спорт</Button></li>
              </ul>
            </div>
            
            <div>
              <h5 className="text-white font-semibold mb-3">Поддержка</h5>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><Button variant="ghost" className="p-0 h-auto text-gray-400 hover:text-yellow-400" onClick={() => setChatOpen(true)}>Чат 24/7</Button></li>
                <li><Button variant="ghost" className="p-0 h-auto text-gray-400 hover:text-yellow-400">FAQ</Button></li>
                <li><Button variant="ghost" className="p-0 h-auto text-gray-400 hover:text-yellow-400">Правила</Button></li>
                <li><Button variant="ghost" className="p-0 h-auto text-gray-400 hover:text-yellow-400">Ответственная игра</Button></li>
              </ul>
            </div>
            
            <div>
              <h5 className="text-white font-semibold mb-3">Контакты</h5>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li>support@royale-casino.com</li>
                <li>+7 (800) 123-45-67</li>
                <li>Лицензия: №12345-MGA</li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
                  Поддержка онлайн
                </li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-6 text-center text-gray-400 text-sm">
            <p>&copy; 2024 ROYALE CASINO. Все права защищены. | 18+ | Играйте ответственно | Азартные игры могут вызывать зависимость</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Index