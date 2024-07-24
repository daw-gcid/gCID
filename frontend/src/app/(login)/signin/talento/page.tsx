"use client";
import HomeLogo from "@/src/components/HomeLogo";
import { useContext, useState } from "react";
import { AuthContext } from "@/src/context/authContext";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import { api } from "@/src/api/axios";
import { CheckCircle, CloudUpload, Trash2 } from "lucide-react";

function SigninTalentoPage() {
  const [nome, setNome] = useState("");
  const [instituicao, setInstituicao] = useState("");
  const [curso, setCurso] = useState("");
  const [dtInicio, setDtInicio] = useState("");
  const [dtFim, setDtFim] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [nacionalidade, setNacionalidade] = useState("");
  const [dtNascimento, setDtNascimento] = useState("");
  const [coeficiente, setCoeficiente] = useState("");
  const [cidade, setCidade] = useState("");
  const [estado, setEstado] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [github, setGithub] = useState("");
  const [pathMatricula, setPathMatricula] = useState<File | null>(null);
  const [pathHistorico, setPathHistorico] = useState<File | null>(null);

  const { user } = useContext(AuthContext);
  if (!user) {
    return null;
  }

  const handleRegisterTalento = async (event: React.FormEvent) => {
    event.preventDefault();
    const userId = user.id;
    const formData = new FormData();
    formData.append("nome", nome);
    formData.append("instituicao", instituicao);
    formData.append("curso", curso);
    formData.append("dtInicio", dtInicio);
    formData.append("dtFim", dtFim);
    formData.append("email", email);
    formData.append("telefone", telefone);
    formData.append("nacionalidade", nacionalidade);
    formData.append("dtNascimento", dtNascimento);
    formData.append("coeficiente", coeficiente);
    formData.append("cidade", cidade);
    formData.append("estado", estado);
    formData.append("userId", userId);

    if (pathMatricula) formData.append("pathMatricula", pathMatricula);
    if (pathHistorico) formData.append("pathHistorico", pathHistorico);

    if (linkedin) formData.append("linkedin", linkedin);
    if (github) formData.append("github", github);

    try {
      const response = await api.post("/talento", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("Talento cadastrado com sucesso!");
      // console.log(response);
      window.location.href = "/talento";
    } catch (error) {
      const err = error as AxiosError;
      toast.error((err.response?.data as { message: string })?.message);
    }
  };

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-lg">
          <div className="flex justify-center">
            <HomeLogo />
          </div>
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Cadastro de Talento
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-lg">
          <form className="space-y-6" onSubmit={handleRegisterTalento}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="nome"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Nome completo
                </label>
                <div className="mt-2">
                  <input
                    id="nome"
                    name="nome"
                    type="text"
                    placeholder="Digite o nome"
                    required
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-custom-blue sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="instituicao"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Instituição
                </label>
                <div className="mt-2">
                  <input
                    id="instituicao"
                    name="instituicao"
                    type="text"
                    placeholder="Digite a instituição"
                    required
                    value={instituicao}
                    onChange={(e) => setInstituicao(e.target.value)}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-custom-blue sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="curso"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Curso
                </label>
                <div className="mt-2">
                  <input
                    id="curso"
                    name="curso"
                    type="text"
                    placeholder="Digite o curso"
                    required
                    value={curso}
                    onChange={(e) => setCurso(e.target.value)}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-custom-blue sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="dtInicio"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Data de Início
                </label>
                <div className="mt-2">
                  <input
                    id="dtInicio"
                    name="dtInicio"
                    type="date"
                    required
                    value={dtInicio}
                    onChange={(e) => setDtInicio(e.target.value)}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-custom-blue sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="dtFim"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Data de Término
                </label>
                <div className="mt-2">
                  <input
                    id="dtFim"
                    name="dtFim"
                    type="date"
                    required
                    value={dtFim}
                    onChange={(e) => setDtFim(e.target.value)}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-custom-blue sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Email
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Digite o email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-custom-blue sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="telefone"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Telefone
                </label>
                <div className="mt-2">
                  <input
                    id="telefone"
                    name="telefone"
                    type="text"
                    maxLength={12}
                    placeholder="Ex.: (00) 91234-5678"
                    required
                    value={telefone}
                    onChange={(e) => setTelefone(e.target.value)}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-custom-blue sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="nacionalidade"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Nacionalidade
                </label>
                <div className="mt-2">
                  <input
                    id="nacionalidade"
                    name="nacionalidade"
                    type="text"
                    placeholder="Digite a nacionalidade"
                    required
                    value={nacionalidade}
                    onChange={(e) => setNacionalidade(e.target.value)}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-custom-blue sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="dtNascimento"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Data de Nascimento
                </label>
                <div className="mt-2">
                  <input
                    id="dtNascimento"
                    name="dtNascimento"
                    type="date"
                    required
                    value={dtNascimento}
                    onChange={(e) => setDtNascimento(e.target.value)}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-custom-blue sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="coeficiente"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Coeficiente
                </label>
                <div className="mt-2">
                  <input
                    id="coeficiente"
                    name="coeficiente"
                    type="text"
                    placeholder="Digite o coeficiente"
                    required
                    value={coeficiente}
                    onChange={(e) => setCoeficiente(e.target.value)}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-custom-blue sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="cidade"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Cidade
                </label>
                <div className="mt-2">
                  <input
                    id="cidade"
                    name="cidade"
                    type="text"
                    placeholder="Digite a cidade"
                    required
                    value={cidade}
                    onChange={(e) => setCidade(e.target.value)}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-custom-blue sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="estado"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Estado
                </label>
                <div className="mt-2">
                  <input
                    id="estado"
                    name="estado"
                    type="text"
                    placeholder="Digite o estado"
                    required
                    value={estado}
                    onChange={(e) => setEstado(e.target.value)}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-custom-blue sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="linkedin"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Linkedin
                </label>
                <div className="mt-2">
                  <input
                    id="linkedin"
                    name="linkedin"
                    type="text"
                    placeholder="Digite o link do seu Linkedin"
                    value={linkedin}
                    onChange={(e) => setLinkedin(e.target.value)}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-custom-blue sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="github"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Github
                </label>
                <div className="mt-2">
                  <input
                    id="github"
                    name="github"
                    type="text"
                    placeholder="Digite o link do github"
                    value={github}
                    onChange={(e) => setGithub(e.target.value)}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-custom-blue sm:text-sm sm:leading-6"
                  />
                </div>
              </div>


              {/* Upload de Matrícula */}
              <div className="flex items-center justify-center bg-grey-lighter">
                <label className="flex flex-col items-center justify-center px-4 py-4 bg-white text-blue rounded-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer gap-2 w-96 h-36 hover:bg-black/20">
                  {pathMatricula ? (
                    <>
                      <CheckCircle size={50} className="text-custom-green" />
                      <span className="text-base leading-normal text-custom-green">
                        Arquivo de Matrícula anexado
                      </span>
                      <div className="flex justify-center items-center">
                        <span className="text-xs text-custom-green">
                          ({pathMatricula.name.toLowerCase()})
                        </span>
                        <button
                          type="button"
                          className="ml-2 text-red-500 hover:text-red-700"
                          onClick={() => setPathMatricula(null)}
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </>
                  ) : (
                    <div className="flex flex-col items-center justify-center">
                      <CloudUpload size={50} />
                      <span className="text-base leading-normal">
                        Matrícula
                      </span>
                      <input
                        className="hidden"
                        type="file"
                        onChange={(e) =>
                          setPathMatricula(
                            e.target.files ? e.target.files[0] : null
                          )
                        }
                      />
                    </div>
                  )}
                </label>
              </div>

              

              {/* Upload de Histórico Escolar */}
              <div className="flex items-center justify-center bg-grey-lighter">
                <label className="flex flex-col items-center justify-center px-4 py-4 bg-white text-blue rounded-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer gap-2 w-96 h-36 hover:bg-black/20">
                  {pathHistorico ? (
                    <>
                      <CheckCircle size={50} className="text-custom-green" />
                      <span className="text-base leading-normal text-custom-green">
                        Arquivo de Histórico Escolar anexado
                      </span>
                      <div className="flex justify-center items-center">
                        <span className="text-xs text-custom-green">
                          ({pathHistorico.name.toLowerCase()})
                        </span>
                        <button
                          type="button"
                          className="ml-2 text-red-500 hover:text-red-700"
                          onClick={() => setPathHistorico(null)}
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      <CloudUpload size={50} />
                      <span className="text-base leading-normal">
                        Histórico Escolar
                      </span>
                    </>
                  )}
                  <input
                    className="hidden"
                    type="file"
                    onChange={(e) =>
                      setPathHistorico(
                        e.target.files ? e.target.files[0] : null
                      )
                    }
                  />
                </label>
              </div>
            </div>
            {/* Botão de envio */}
            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-gradient-to-r from-custom-blue to-custom-green px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Finalizar cadastro
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default SigninTalentoPage;
