import { Button } from "@/src/components/ui/button";
import { Talento } from "@/src/context/authContext";
import { Project } from "./ComponentsManager";

export function FormCreateTeam({
  projects,
  talents,
}: {
  projects: Project[];
  talents: Talento[];
}) {

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData.entries());
    console.log(data);
    // Logic for team creation
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 max-w-md mx-auto p-6 bg-white shadow-md rounded-lg"
    >
      <div className="flex flex-col space-y-2">
        <label className="font-semibold text-gray-700">Projeto</label>
        <select
          name="projectId"
          required
          className="px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
        >
          {projects.map((project) => (
            <option key={project.id} value={project.id}>
              {project.nome}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col space-y-2">
        <label className="font-semibold text-gray-700">Talentos</label>
        {talents && talents.length > 0 ? (
          <select
            name="talentIds"
            multiple
            required
            className="px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
          >
            {talents.map((talent) => (
              <option key={talent.id} value={talent.id}>
                {talent.nome}
              </option>
            ))}
          </select>
        ) : (
          <p className="text-gray-500">Sem talentos cadastrados</p>
        )}
      </div>

      <div className="flex flex-col space-y-2">
        <label className="font-semibold text-gray-700">Cargo</label>
        <input
          type="text"
          name="cargo"
          required
          className="px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
        />
      </div>

      <div className="text-center">
        <Button
          type="submit"
          variant={"default"}
          className="w-full bg-custom-blue text-white py-2 px-4 rounded-md hover:bg-custom-green"
        >
          Criar Equipe
        </Button>
      </div>
    </form>
  );
}
