import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import Icon from '@/components/ui/icon'

const Index = () => {
  const [chatOpen, setChatOpen] = useState(false)
  const [messages, setMessages] = useState([
    { id: 1, text: 'Добро пожаловать в службу поддержки! Как дела?', isSupport: true, time: '14:20' }
  ])
  const [newMessage, setNewMessage] = useState('')

  const sendMessage = () => {
    if (!newMessage.trim()) return
    setMessages(prev => [...prev, {
      id: prev.length + 1,
      text: newMessage,
      isSupport: false,
      time: new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })
    }])
    setNewMessage('')
  }

  const gameCategories = [
    {
      title: 'Слоты',
      icon: 'Sparkles',
      count: '500+',
      gradient: 'bg-gradient-to-br from-casino-red to-casino-darkgold',
      games: [
        { name: 'Book of Dead', provider: 'Play\'n GO', jackpot: '₽1,250,000' },
        { name: 'Starburst', provider: 'NetEnt', jackpot: '₽850,000' },
        { name: 'Sweet Bonanza', provider: 'Pragmatic Play', jackpot: '₽2,100,000' }
      ]
    },
    {
      title: 'Рулетка',
      icon: 'RotateCw',
      count: '15+',
      gradient: 'bg-gradient-to-br from-casino-gold to-casino-red',
      games: [
        { name: 'European Roulette', provider: 'Evolution', jackpot: 'Live' },
        { name: 'Lightning Roulette', provider: 'Evolution', jackpot: 'Live' },
        { name: 'Russian Roulette', provider: 'Authentic Gaming', jackpot: 'Live' }
      ]
    },
    {
      title: 'Покер',
      icon: 'Spade',
      count: '25+',
      gradient: 'bg-gradient-to-br from-casino-darkgold to-casino-dark',
      games: [
        { name: 'Texas Hold\'em', provider: 'PokerStars', jackpot: '₽5,000,000' },
        { name: 'Caribbean Stud', provider: 'Evolution', jackpot: 'Live' },
        { name: 'Three Card Poker', provider: 'Playtech', jackpot: '₽750,000' }
      ]
    },
    {
      title: 'Спорт',
      icon: 'Trophy',
      count: '1000+',
      gradient: 'bg-gradient-to-br from-green-600 to-casino-gold',
      games: [
        { name: 'Футбол', provider: 'Live', jackpot: '₽10,000,000+' },
        { name: 'Хоккей', provider: 'Live', jackpot: '₽5,000,000+' },
        { name: 'Баскетбол', provider: 'Live', jackpot: '₽8,000,000+' }
      ]
    }
  ]

  const promoOffers = [
    {
      title: 'Добро пожаловать!',
      description: 'Бонус 100% до ₽50,000 + 250 фриспинов',
      code: 'WELCOME100',
      color: 'bg-casino-red'
    },
    {
      title: 'Weekend Reload',
      description: 'Бонус 50% каждые выходные',
      code: 'WEEKEND50',
      color: 'bg-casino-gold'
    },
    {
      title: 'VIP Cashback',
      description: 'До 20% возврата средств каждую неделю',
      code: 'VIPCASH',
      color: 'bg-purple-600'
    }
  ]

  return (
    <div className="min-h-screen bg-casino-darker">
      {/* Header */}
      <header className="border-b border-casino-gray bg-casino-dark/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-casino font-bold text-casino-gold">ROYALE CASINO</h1>
            <Badge className="bg-casino-red text-white">LIVE</Badge>
          </div>
          
          <nav className="hidden md:flex space-x-6">
            <Button variant="ghost" className="text-white hover:text-casino-gold">Главная</Button>
            <Button variant="ghost" className="text-white hover:text-casino-gold">Слоты</Button>
            <Button variant="ghost" className="text-white hover:text-casino-gold">Рулетка</Button>
            <Button variant="ghost" className="text-white hover:text-casino-gold">Покер</Button>
            <Button variant="ghost" className="text-white hover:text-casino-gold">Спорт</Button>
            <Button variant="ghost" className="text-white hover:text-casino-gold">Промо</Button>
          </nav>

          <div className="flex items-center space-x-4">
            <Button className="bg-casino-gold text-black font-semibold hover:bg-casino-darkgold">
              Войти
            </Button>
            <Button variant="outline" className="border-casino-gold text-casino-gold hover:bg-casino-gold hover:text-black">
              Регистрация
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-casino-dark via-casino-darker to-casino-dark overflow-hidden">
        <div className="absolute inset-0 opacity-20" style={{backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23fbbf24' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")"}}></div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-5xl md:text-7xl font-casino font-bold text-white mb-6 animate-fade-in">
            Добро пожаловать в
            <span className="text-transparent bg-gradient-to-r from-casino-gold to-casino-red bg-clip-text"> ROYALE</span>
          </h2>
          <p className="text-xl text-casino-gray max-w-2xl mx-auto mb-8 animate-fade-in">
            Премиальное онлайн-казино с лучшими играми, щедрыми бонусами и круглосуточной поддержкой
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button className="bg-casino-red text-white text-lg px-8 py-3 hover:bg-red-700 animate-pulse-gold">
              <Icon name="Play" className="mr-2" />
              Начать играть
            </Button>
            <Button variant="outline" className="border-casino-gold text-casino-gold text-lg px-8 py-3 hover:bg-casino-gold hover:text-black">
              <Icon name="Gift" className="mr-2" />
              Получить бонус
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {[
              { label: 'Игроков онлайн', value: '24,847', icon: 'Users' },
              { label: 'Выигрышей сегодня', value: '₽15.2M', icon: 'TrendingUp' },
              { label: 'Игр доступно', value: '2,500+', icon: 'GamepadIcon' },
              { label: 'Средняя выплата', value: '97.8%', icon: 'Percent' }
            ].map((stat, index) => (
              <Card key={index} className="bg-casino-dark/60 border-casino-gray backdrop-blur-sm">
                <CardContent className="p-4 text-center">
                  <Icon name={stat.icon} className="mx-auto mb-2 text-casino-gold" size={24} />
                  <p className="text-2xl font-bold text-white">{stat.value}</p>
                  <p className="text-casino-gray text-sm">{stat.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Game Categories */}
      <section className="py-16 bg-casino-dark">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-casino font-bold text-center text-white mb-12">
            Популярные категории игр
          </h3>

          <Tabs defaultValue="slots" className="w-full">
            <TabsList className="grid w-full grid-cols-4 bg-casino-darker border border-casino-gray mb-8">
              <TabsTrigger value="slots" className="data-[state=active]:bg-casino-gold data-[state=active]:text-black">Слоты</TabsTrigger>
              <TabsTrigger value="roulette" className="data-[state=active]:bg-casino-gold data-[state=active]:text-black">Рулетка</TabsTrigger>
              <TabsTrigger value="poker" className="data-[state=active]:bg-casino-gold data-[state=active]:text-black">Покер</TabsTrigger>
              <TabsTrigger value="sports" className="data-[state=active]:bg-casino-gold data-[state=active]:text-black">Спорт</TabsTrigger>
            </TabsList>

            {gameCategories.map((category, index) => (
              <TabsContent key={category.title.toLowerCase()} value={category.title.toLowerCase()}>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {category.games.map((game, gameIndex) => (
                    <Card key={gameIndex} className="bg-casino-darker border-casino-gray hover:border-casino-gold transition-all duration-300 hover:scale-105 cursor-pointer">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between mb-4">
                          <div>
                            <h4 className="text-lg font-semibold text-white">{game.name}</h4>
                            <p className="text-casino-gray text-sm">{game.provider}</p>
                          </div>
                          <Icon name={category.icon} className="text-casino-gold" size={32} />
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-casino-gold font-semibold">{game.jackpot}</span>
                          <Button size="sm" className="bg-casino-red hover:bg-red-700">
                            Играть
                          </Button>
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
      <section className="py-16 bg-gradient-to-r from-casino-dark via-casino-darker to-casino-dark">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-casino font-bold text-center text-white mb-12">
            Эксклюзивные предложения
          </h3>
          
          <div className="grid md:grid-cols-3 gap-6">
            {promoOffers.map((offer, index) => (
              <Card key={index} className={`${offer.color} border-0 text-white hover:scale-105 transition-transform duration-300`}>
                <CardContent className="p-6">
                  <h4 className="text-xl font-bold mb-3">{offer.title}</h4>
                  <p className="mb-4 opacity-90">{offer.description}</p>
                  <div className="flex items-center justify-between">
                    <code className="bg-black/20 px-2 py-1 rounded text-sm">{offer.code}</code>
                    <Button variant="secondary" size="sm" className="bg-white/20 hover:bg-white/30">
                      Получить
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Live Chat Button */}
      <Dialog open={chatOpen} onOpenChange={setChatOpen}>
        <DialogTrigger asChild>
          <Button 
            className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-casino-gold text-black hover:bg-casino-darkgold shadow-lg animate-pulse-gold z-50"
            size="icon"
          >
            <Icon name="MessageCircle" size={24} />
          </Button>
        </DialogTrigger>
        
        <DialogContent className="bg-casino-dark border-casino-gray text-white max-w-md">
          <DialogHeader>
            <DialogTitle className="text-casino-gold">Служба поддержки</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="h-64 overflow-y-auto space-y-3 p-3 bg-casino-darker rounded border border-casino-gray">
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.isSupport ? 'justify-start' : 'justify-end'}`}>
                  <div className={`max-w-[80%] p-2 rounded-lg ${
                    message.isSupport 
                      ? 'bg-casino-gray text-white' 
                      : 'bg-casino-gold text-black'
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
                className="bg-casino-darker border-casino-gray text-white"
              />
              <Button onClick={sendMessage} className="bg-casino-gold text-black hover:bg-casino-darkgold">
                <Icon name="Send" size={16} />
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Footer */}
      <footer className="bg-casino-darker border-t border-casino-gray py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h4 className="text-casino-gold font-casino font-bold text-lg mb-4">ROYALE CASINO</h4>
              <p className="text-casino-gray text-sm">
                Лицензированное онлайн-казино с играми от лучших провайдеров мира.
              </p>
            </div>
            
            <div>
              <h5 className="text-white font-semibold mb-3">Игры</h5>
              <ul className="space-y-2 text-casino-gray text-sm">
                <li>Слоты</li>
                <li>Рулетка</li>
                <li>Покер</li>
                <li>Спортивные ставки</li>
              </ul>
            </div>
            
            <div>
              <h5 className="text-white font-semibold mb-3">Поддержка</h5>
              <ul className="space-y-2 text-casino-gray text-sm">
                <li>Служба поддержки 24/7</li>
                <li>FAQ</li>
                <li>Правила</li>
                <li>Ответственная игра</li>
              </ul>
            </div>
            
            <div>
              <h5 className="text-white font-semibold mb-3">Контакты</h5>
              <ul className="space-y-2 text-casino-gray text-sm">
                <li>support@royale-casino.com</li>
                <li>+7 (800) 123-45-67</li>
                <li>Лицензия: №12345-MGA</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-casino-gray mt-8 pt-6 text-center text-casino-gray text-sm">
            <p>&copy; 2024 ROYALE CASINO. Все права защищены. | 18+ | Играйте ответственно</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Index