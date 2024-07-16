"use client";
import Link from "next/link"
import {
	Bell,
	CircleUser,
	Home,
	LineChart,
	Menu,
	Package,
	Search,
	ShoppingCart,
	Users,
} from "lucide-react"
import GLogo from "@/src/components/gLogo"
import { Badge } from "@/src/components/ui/badge"
import { Button } from "@/src/components/ui/button"
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/src/components/ui/card"
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/src/components/ui/dropdown-menu"
import { Input } from "@/src/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/src/components/ui/sheet"
import { zen_dots } from "../fonts"
import { useContext, useState } from "react"
import { AuthContext } from "@/src/context/authContext"
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
  } from "@/src/components/ui/dialog";
import Label from "@/src/components/ui/label";


export default function Dashboard() {
	const {logout, user} = useContext(AuthContext);
	const [isDialogOpen, setIsDialogOpen] = useState(false);

	const handleAddProject = () => {
	  setIsDialogOpen(true);
	};
  
	const handleDialogClose = () => {
	  setIsDialogOpen(false);
	};

	if(!user){
		return null
	}

	return (
		<div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
			<div className="hidden border-r bg-muted/40 md:block">
				<div className="flex h-full max-h-screen flex-col gap-2">
					<div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
						<Link href="/client" className="flex items-center gap-2 font-semibold text-3xl">
							<GLogo />
							<span className={zen_dots.className}>CiD</span>
						</Link>
						<Button variant="outline" size="icon" className="ml-auto h-8 w-8">
							<Bell className="h-4 w-4" />
							<span className="sr-only">notificações</span>
						</Button>
					</div>
					<div className="flex-1">
						<nav className="grid items-start px-2 text-sm font-medium lg:px-4">
							<Link
								href="#"
								className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
							>
								<Home className="h-4 w-4" />
								Dashboard
							</Link>
							<Link
								href="#"
								className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
							>
								<ShoppingCart className="h-4 w-4" />
								Demandas
								{/* <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
									6
								</Badge> */}
							</Link>
							<Link
								href="#"
								className="flex items-center gap-3 rounded-lg bg-muted px-3 py-2 text-primary transition-all hover:text-primary"
							>
								<Package className="h-4 w-4" />
								Projetos{" "}
							</Link>
							<Link
								href="#"
								className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
							>
								<Users className="h-4 w-4" />
								Parcerias
							</Link>
							<Link
								href="#"
								className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
							>
								<LineChart className="h-4 w-4" />
								Análises
							</Link>
						</nav>
					</div>
					<div className="mt-auto p-4">
						<Card>
							<CardHeader className="p-2 pt-0 md:p-4">
								<CardTitle>Upgrade para o Pro</CardTitle>
								<CardDescription>
									Desbloqueie todas os recursos e tenha acesso ilimitado ao nosso sistema.
								</CardDescription>
							</CardHeader>
							<CardContent className="p-2 pt-0 md:p-4 md:pt-0">
								<Button size="sm" className="w-full">
									Upgrade
								</Button>
							</CardContent>
						</Card>
					</div>
				</div>
			</div>
			<div className="flex flex-col">
				<header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
					<Sheet>
						<SheetTrigger asChild>
							<Button
								variant="outline"
								size="icon"
								className="shrink-0 md:hidden"
							>
								<Menu className="h-5 w-5" />
								<span className="sr-only">navegação</span>
							</Button>
						</SheetTrigger>
						<SheetContent side="left" className="flex flex-col">
							<nav className="grid gap-2 text-lg font-medium">
								<Link
									href="#"
									className="flex items-center gap-2 text-lg font-semibold"
								>
									<GLogo />
									<span className={zen_dots.className}>CiD</span>
								</Link>
								<Link
									href="#"
									className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
								>
									<Home className="h-5 w-5" />
									Dashboard
								</Link>
								<Link
									href="#"
									className="mx-[-0.65rem] flex items-center gap-4 rounded-xl bg-muted px-3 py-2 text-foreground hover:text-foreground"
								>
									<ShoppingCart className="h-5 w-5" />
									Demandas
									<Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
										6
									</Badge>
								</Link>
								<Link
									href="#"
									className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
								>
									<Package className="h-5 w-5" />
									Projetos
								</Link>
								<Link
									href="#"
									className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
								>
									<Users className="h-5 w-5" />
									Parcerias
								</Link>
								<Link
									href="#"
									className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
								>
									<LineChart className="h-5 w-5" />
									Análises
								</Link>
							</nav>
							<div className="mt-auto">
								<Card>
									<CardHeader>
										<CardTitle>Upgrade para o Pro</CardTitle>
										<CardDescription>
										Desbloqueie todas os recursos e tenha acesso ilimitado ao nosso sistema.
										</CardDescription>
									</CardHeader>
									<CardContent>
										<Button size="sm" className="w-full">
											Upgrade
										</Button>
									</CardContent>
								</Card>
							</div>
						</SheetContent>
					</Sheet>
					<div className="w-full flex-1">
						<form>
							<div className="relative">
								<Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
								<Input
									type="search"
									placeholder="Search products..."
									className="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"
								/>
							</div>
						</form>
					</div>
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button variant="secondary" size="icon" className="rounded-full">
								<CircleUser className="h-5 w-5" />
								<span className="sr-only">botão de user</span>
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align="end">
							<DropdownMenuLabel>Meu Perfil</DropdownMenuLabel>
							<DropdownMenuSeparator />
							<DropdownMenuItem>Configurações</DropdownMenuItem>
							<DropdownMenuItem>Ajuda</DropdownMenuItem>
							<DropdownMenuSeparator />
							<DropdownMenuItem onClick={logout}>Logout</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</header>
				<main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
					<div className="flex items-center">
						<h1 className="text-lg font-semibold md:text-2xl">Projetos</h1>
					</div>
					<div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm">
						<div className="flex flex-col items-center gap-1 text-center">
							<h3 className="text-2xl font-bold tracking-tight">
								Você não tem projetos
							</h3>
							<p className="text-sm text-muted-foreground">
								Cadastre sua demanda em nosso sistema, nós cuidamos do resto.
							</p>
							<Dialog>
								<DialogTrigger asChild>
									<Button variant="outline">Adicionar Projeto</Button>
								</DialogTrigger>
								<DialogContent className="max-w-[600px] overflow-y-auto">
									<DialogHeader>
									<DialogTitle>Adicionar Projeto</DialogTitle>
									<DialogDescription>
										Cadastre seu projeto aqui.
									</DialogDescription>
									</DialogHeader>
									<div className="grid gap-4 py-4">
										<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
											<div className="flex flex-col">
											<Label htmlFor="nome-projeto" className="mb-1">
												Nome do Projeto
											</Label>
											<Input
												id="nome-projeto"
												defaultValue="Ex. Plataforma Educacional"
												className="py-2 px-3 rounded-md border border-gray-300"
											/>
											</div>
											<div className="flex flex-col">
											<Label htmlFor="descricao" className="mb-1">
												Descrição
											</Label>
											<Input
												id="descricao"
												defaultValue="Descrição..."
												className="py-2 px-3 rounded-md border border-gray-300"
											/>
											</div>
											<div className="flex flex-col">
											<Label htmlFor="empresa" className="mb-1">
												Empresa
											</Label>
											<Input
												id="empresa"
												defaultValue="Company S.A"
												className="py-2 px-3 rounded-md border border-gray-300"
											/>
											</div>
											<div className="flex flex-col">
											<Label htmlFor="data-inicio" className="mb-1">
												Data de Início
											</Label>
											<Input
												id="data-inicio"
												defaultValue="19/09/2022"
												className="py-2 px-3 rounded-md border border-gray-300"
											/>
											</div>
											<div className="flex flex-col">
											<Label htmlFor="area-conhecimento" className="mb-1">
												Área de Conhecimento
											</Label>
											<Input
												id="area-conhecimento"
												defaultValue="19/09/2022"
												className="py-2 px-3 rounded-md border border-gray-300"
											/>
											</div>
										</div>
										</div>
									<DialogFooter>
									<Button type="submit">Salvar Projeto</Button>
									</DialogFooter>
								</DialogContent>
							</Dialog>
						</div>
					</div>
				</main>
			</div>
			
		</div>
	)
}

