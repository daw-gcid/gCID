"use client";
import Link from "next/link";
import { api } from "@/src/api/axios";
import { toast } from "react-toastify";
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
    CirclePlus,
} from "lucide-react";
import GLogo from "@/src/components/gLogo";
import { Badge } from "@/src/components/ui/badge";
import { Button } from "@/src/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/src/components/ui/card";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/src/components/ui/dropdown-menu";
import axios, { AxiosError } from 'axios';
import { Input } from "@/src/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/src/components/ui/sheet";
import { zen_dots } from "../fonts";
import { use, useContext, useEffect, useState, useRef } from "react";
import { AuthContext } from "@/src/context/authContext";

import { Checkbox, CheckboxIndicator } from "@radix-ui/react-checkbox";
import { Label } from "@/src/components/ui/label";
import { Textarea } from "@/src/components/ui/textarea";

interface Projeto {
    id: string;
    nome: string;
    descricao: string;
    status: number; 
    dtFim: string; 
    dtCadastro: string;
    dtAtualizacao: string;
    feedback: string;
    dtFeedback: string; 
    publico: boolean;
    dtInicio: string; 
}

export default function InstitutoPage() {
    const { logout, user } = useContext(AuthContext);
    const [projetos, setProjetos] = useState<Projeto[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (user) {
            axios.get(`http://localhost:3000/projeto`)
            .then((response) => {
                setProjetos(response.data);
                setLoading(false);
              })
              .catch((error: AxiosError) => {
                setError(error.message);
                setLoading(false);
                toast.error("Erro ao carregar projetos");
              });
        }
    }, [user]);

    const dialogTriggerRef = useRef<HTMLButtonElement>(null);

    if (!user) {
        return null;
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget as HTMLFormElement);
        const data = Object.fromEntries(formData.entries());

        // Falta a parte de salvar os dados no bd
    };



    return (
        <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr] ">
            <div className="hidden border-r bg-muted/40 md:block bg-green-400">
                <div className="flex h-full max-h-screen flex-col gap-2">
                    <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
                        <Link
                            href="/client"
                            className="flex items-center gap-2 font-semibold text-3xl"
                        >
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
                                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary">
                                <Home className="h-4 w-4" />
                                Dashboard
                            </Link>
                            <Link
                                href="#"
                                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                            >
                                <ShoppingCart className="h-4 w-4" />
                                Talentos
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
                        </nav>
                    </div>
                    <div className="mt-auto p-4">
                        <Card>
                            <CardHeader className="p-2 pt-0 md:p-4">
                                <CardTitle>Upgrade para o Pro</CardTitle>
                                <CardDescription>
                                    Desbloqueie todas os recursos e tenha acesso ilimitado ao
                                    nosso sistema.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="p-2 pt-0 md:p-4 md:pt-0">
                                <Button size="sm" className="w-full bg-custom-green text-black font-bold hover:text-white">
                                    SEJA PRO
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
                                            Desbloqueie todas os recursos e tenha acesso ilimitado ao
                                            nosso sistema.
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <Button size="sm" className="w-full bg-custom-green text-black font-bold hover:text-white">
                                            SEJA PRO
                                        </Button>
                                    </CardContent>
                                </Card>
                            </div>
                        </SheetContent>
                    </Sheet>
                    <div className="w-full flex-1">
                        <form>
                            <div className="relative">
                                <label htmlFor="isearch">
                                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                                </label>
                                <Input
                                    type="search"
                                    placeholder="Search products..."
                                    className="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"
                                    id="isearch"
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
                <main className="flex-1 overflow-hidden px-4 py-2">
                {loading ? (
                    <div>Carregando...</div>
                ) : error ? (
                    <div>{error}</div>
                ) : projetos.length > 0 ? (
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {projetos.map((projeto) => (
                        <Card key={projeto.id}>
                        <CardHeader>
                            <CardTitle>{projeto.nome}</CardTitle>
                            <CardDescription>{projeto.descricao}</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="flex flex-col">
                            <span>Status: {projeto.status}</span>
                            <span>Data de Início: {new Date(projeto.dtInicio).toLocaleDateString()}</span>
                            <span>Data de Fim: {new Date(projeto.dtFim).toLocaleDateString()}</span>
                            <span>Feedback: {projeto.feedback}</span>
                            <span>Data do Feedback: {new Date(projeto.dtFeedback).toLocaleDateString()}</span>
                            <span>Visibilidade: {projeto.publico ? 'Público' : 'Privado'}</span>
                            </div>
                        </CardContent>
                        </Card>
                    ))}
                    </div>
                ) : (
                    <div className="text-center text-lg">Você não tem projetos cadastrados.</div>
                )}
                </main>
            </div>
        </div>
    );
}
