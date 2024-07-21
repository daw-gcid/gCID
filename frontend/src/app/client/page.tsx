"use client";
import Link from "next/link";
import { api } from "@/src/api/axios";
import { AxiosError } from "axios";
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
import { Input } from "@/src/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/src/components/ui/sheet";
import { zen_dots } from "../fonts";
import { use, useContext, useEffect, useState, useRef } from "react";
import { AuthContext } from "@/src/context/authContext";

import { Checkbox, CheckboxIndicator } from "@radix-ui/react-checkbox";
import { Label } from "@/src/components/ui/label";
import { Textarea } from "@/src/components/ui/textarea";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose,
} from "@/src/components/ui/dialog";


export default function Dashboard() {
    const { logout, user } = useContext(AuthContext);
    const [projects, setProjects] = useState([]); //Isso é uma variavel para verificar se existem projetos ou não, dessa forma ira mudar a apresentação de projetos. Fiz por variavel por não saber como pegar dados do bd..

    useEffect(() => {
        if (user) {
            api.get(`/projeto/cliente/7242efa0-1631-4e21-8fe3-79465baca38f`)
                .then((response) => {
                    setProjects(response.data);
                })
                .catch((error: AxiosError) => {
                    toast.error("Erro ao carregar projetos");
                });
        }
    }, [user]);

    interface Project {
        id: string;
        nome: string;
        descricao: string;
        dtFim: Date;
        dtCadastro: Date;
        dtAtualizacao: Date;
        feedback: string | null;
        dtFeedback: Date | null;
        dtInicio: Date;
    }

    const dialogTriggerRef = useRef<HTMLButtonElement>(null);

    const openDialog = () => {
        if (dialogTriggerRef.current) {
            dialogTriggerRef.current.click();
        }
    };

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
                <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6 ">
                    <div className="flex items-center">
                        <h1 className="text-lg font-semibold md:text-2xl">Projetos</h1>
                        <Button
                            onClick={openDialog}
                            size="icon"
                            variant="secondary"
                            className="rounded-full text-custom-green bg-transparent"
                        >
                            <CirclePlus className="w-6 h-6" />
                        </Button>

                    </div>
                    <div className="flex flex-1">
                        {/* Essa parte aqui serve para verificar se na lista existe algo ou não, da para alterar pela tipo de estrutura de dados que vai ser usado. */}
                        {/*projects.length > 0*/ 1 != 1 ? (
                            <div className="flex-1 grid grid-cols-1 gap-4 ">
                                {projects.map((project: Project, index) => (
                                    <Card key={index}>
                                        <CardHeader>
                                            <CardTitle>{project?.nome}</CardTitle>
                                            <CardDescription>{project?.descricao}</CardDescription>
                                            {/*Isso aqui ta responsivo, caso queira colcoar mais dados, verifiquei no meu bando de dados e os dados relevantes que vamos pedir no cadastro é o nome e a descrição,mas podem ser definidos outros*/}
                                        </CardHeader>
                                    </Card>
                                ))}
                                <div className="fixed bottom-0 right-0 mb-10 mr-10">
                                    <Button onClick={openDialog} className="bg-custom-green text-black font-bold hover:text-white">Adicionar Projeto</Button>
                                </div>
                                <div className="fixed bottom-0 right-0 mb-10 mr-10">
                                    <Dialog>
                                        <DialogTrigger asChild>
                                            <Button ref={dialogTriggerRef} className="sr-only">Adicionar Projeto</Button>
                                        </DialogTrigger>
                                        <DialogContent className="sm:max-w-lg sm:max-h-[80vh] overflow-y-auto p-6 rounded-lg bg-white shadow-lg">
                                            <DialogHeader>
                                                <DialogTitle className="text-2xl font-semibold">Cadastre seu projeto</DialogTitle>
                                                <DialogDescription className="text-base text-muted-foreground">
                                                    Cadastre as informações do seu projeto aqui.
                                                </DialogDescription>
                                            </DialogHeader>
                                            <form onSubmit={handleSubmit} className="grid gap-6 py-4">
                                                <div className="grid gap-4">
                                                    <label htmlFor="name" className="block text-lg font-medium">
                                                        Nome do projeto
                                                    </label>
                                                    <Input
                                                        id="name"
                                                        name="name"
                                                        className="border  rounded-md shadow-sm w-full px-3 py-2 focus:border-custom-green focus:ring-custom-green"
                                                    />
                                                </div>
                                                <div className="grid gap-4">
                                                    <Label htmlFor="description" className="block text-lg font-medium">Descrição do projeto</Label>
                                                    <Textarea placeholder="Escreva sua descrição." id="description" className="border rounded-md shadow-sm w-full px-3 py-2 focus:border-custom-green focus:ring-custom-green" />
                                                </div>
                                                <div className="hidden grid-cols-4 items-center gap-4">
                                                    <label htmlFor="clienteId" className="text-lg font-medium text-right">
                                                        Cliente ID
                                                    </label>
                                                    <Input id="clienteId" name="clienteId" className="col-span-3 border rounded-md shadow-sm px-3 py-2" />
                                                </div>
                                                <div className="hidden grid-cols-4 items-center gap-4">
                                                    <label htmlFor="areasConhecimento" className="text-lg font-medium text-right">
                                                        Áreas de Conhecimento
                                                    </label>
                                                    <Input id="areasConhecimento" name="areasConhecimento" className="col-span-3 border rounded-md shadow-sm px-3 py-2" />
                                                </div>
                                                <div className="flex items-center space-x-3">
                                                    <input
                                                        id="privado"
                                                        type="checkbox"
                                                        className="w-5 h-5 border-gray-300 rounded checked:bg-custom-green checked:border-transparent focus:ring-custom-green"
                                                    />
                                                    <Label htmlFor="privado" className="text-base" title="As informações só poderão ser acessadas com sua permissão">
                                                        Privado
                                                    </Label>
                                                </div>
                                                <div className="flex justify-end gap-3 mt-4">
                                                    <DialogClose>
                                                        <Button type="button" variant="secondary" className="py-2 px-4 text-base ">
                                                            Fechar
                                                        </Button>
                                                    </DialogClose>
                                                    <Button type="submit" className="py-2 px-4 text-base bg-custom-green text-black hover:text-white">
                                                        Salvar
                                                    </Button>
                                                </div>
                                            </form>
                                        </DialogContent>
                                    </Dialog>
                                </div>

                            </div>

                        ) : (
                            //Apartir daqui é quando não tem projetos
                            <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm">
                                <div className="flex flex-col items-center gap-1 text-center">
                                    <h3 className="text-2xl font-bold tracking-tight">
                                        Você não tem projetos
                                    </h3>
                                    <p className="text-sm text-muted-foreground">
                                        Cadastre sua demanda em nosso sistema, nós cuidamos do resto.
                                    </p>
                                    <Button onClick={openDialog} className="bg-custom-green text-black font-bold hover:text-white">Adicionar Projeto</Button>
                                    <Dialog>
                                        <DialogTrigger asChild>
                                            <Button ref={dialogTriggerRef} className="sr-only">Adicionar Projeto</Button>
                                        </DialogTrigger>
                                        <DialogContent className="sm:max-w-lg sm:max-h-[80vh] overflow-y-auto p-6 rounded-lg bg-white shadow-lg">
                                            <DialogHeader>
                                                <DialogTitle className="text-2xl font-semibold">Cadastre seu projeto</DialogTitle>
                                                <DialogDescription className="text-base text-muted-foreground">
                                                    Cadastre as informações do seu projeto aqui.
                                                </DialogDescription>
                                            </DialogHeader>
                                            <form onSubmit={handleSubmit} className="grid gap-6 py-4">
                                                <div className="grid gap-4">
                                                    <label htmlFor="name" className="block text-lg font-medium">
                                                        Nome do projeto
                                                    </label>
                                                    <Input
                                                        id="name"
                                                        name="name"
                                                        className="border  rounded-md shadow-sm w-full px-3 py-2 focus:border-custom-green focus:ring-custom-green"
                                                    />
                                                </div>
                                                <div className="grid gap-4">
                                                    <Label htmlFor="description" className="block text-lg font-medium">Descrição do projeto</Label>
                                                    <Textarea placeholder="Escreva sua descrição." id="description" className="border rounded-md shadow-sm w-full px-3 py-2 focus:border-custom-green focus:ring-custom-green" />
                                                </div>
                                                <div className="hidden grid-cols-4 items-center gap-4">
                                                    <label htmlFor="clienteId" className="text-lg font-medium text-right">
                                                        Cliente ID
                                                    </label>
                                                    <Input id="clienteId" name="clienteId" className="col-span-3 border rounded-md shadow-sm px-3 py-2" />
                                                </div>
                                                <div className="hidden grid-cols-4 items-center gap-4">
                                                    <label htmlFor="areasConhecimento" className="text-lg font-medium text-right">
                                                        Áreas de Conhecimento
                                                    </label>
                                                    <Input id="areasConhecimento" name="areasConhecimento" className="col-span-3 border rounded-md shadow-sm px-3 py-2" />
                                                </div>
                                                <div className="flex items-center space-x-3">
                                                    <input
                                                        id="privado"
                                                        type="checkbox"
                                                        className="w-5 h-5 border-gray-300 rounded checked:bg-custom-green checked:border-transparent focus:ring-custom-green"
                                                    />
                                                    <Label htmlFor="privado" className="text-base" title="As informações só poderão ser acessadas com sua permissão">
                                                        Privado
                                                    </Label>
                                                </div>
                                                <div className="flex justify-end gap-3 mt-4">
                                                    <DialogClose>
                                                        <Button type="button" variant="secondary" className="py-2 px-4 text-base ">
                                                            Fechar
                                                        </Button>
                                                    </DialogClose>
                                                    <Button type="submit" className="py-2 px-4 text-base bg-custom-green text-black font-bold ">
                                                        Salvar
                                                    </Button>
                                                </div>
                                            </form>
                                        </DialogContent>
                                    </Dialog>
                                </div>
                            </div>
                        )}
                    </div>
                </main>
            </div>
        </div>
    );
}
