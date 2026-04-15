import { useState, useContext } from "react";
import {
  getPermissions,
  postPermissions,
  deletePermission,
  putPermission,
} from "../../API/permissions";
import { PermissionsContext } from "../../Context/permissionsContext";
import { Trash2 } from "lucide-react";
import TextInput from "../Inputs/TextInput";

export default function CollaboratorForm({
  projectId,
  addCollaborator,
  setAddCollaborator,
}) {
  const [permissionsData, setPermissionsData] = useState({
    email: "",
    role: "",
  });

  const { permissions, loadingPermissions, setPermissions } =
    useContext(PermissionsContext);

  function handleChange(e) {
    const { name, value } = e.target;
    setPermissionsData((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const newPermission = await postPermissions(projectId, permissionsData);
      
      setPermissions((prev) => [...prev, newPermission]);
      setPermissionsData({
        email: "",
        role: "",
      });
    } catch (err) {
      console.error("Error setting new Collaborator:", err);
    }
  }

  async function handleChangePermission(e, permissionId) {
    const { value } = e.target;

    try {
      await putPermission(projectId, permissionId, value);

      setPermissions((prev) =>
        prev.map((p) => (p.id === permissionId ? { ...p, role: value } : p)),
      );
    } catch (err) {
      console.error("Error updating permission:", err);
    }
  }

  const projectPermissions = permissions.filter(
    (p) => p.project_id === Number(projectId),
  );

  async function handleDeletePermission(permissionId) {
    try {
      await deletePermission(projectId, permissionId);
      const updated = await getPermissions(projectId);
      setPermissions(updated.length ? [...updated] : []);
    } catch (err) {
      console.log("Error deleting project:", err);
    }
  }

  return (
    addCollaborator && (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
        <div className="bg-(--color-secondary) rounded-xl shadow-lg w-full max-w-md p-6 mx-4">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div className="flex justify-between items-center">
              <label
                htmlFor="Roles"
                className="block text-m font-medium text-(--color-font-primary)"
              >
                Add Collaborator
              </label>

              <button
                type="button"
                onClick={() => setAddCollaborator(false)}
                className="text-(--color-font-secondary) hover:text-(--color-font-primary) rounded-lg w-8 h-8 inline-flex items-center justify-center"
              >
                ✕
              </button>
            </div>
            <div>
              <TextInput
                name="email"
                inputLabel="Enter Collaborators E-Mail"
                data={permissionsData.email}
                handleChange={handleChange}
              />

              <select
                id="Roles"
                name="role"
                value={permissionsData.role}
                onChange={handleChange}
                className="bg-(--color-secondary) border border-(--color-border-primary) text-(--color-font-primary) text-sm rounded-lg
                       focus:ring-(--color-button-focus) focus:border-(--color-button-focus) block w-full p-2.5"
              >
                <option value="" disabled>
                  Choose Permission Type
                </option>
                <option value="viewer">Viewer</option>
                <option value="editor">Editor</option>
              </select>
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                className="mt-2 text-(--color-button-font) bg-(--color-button) border border-(--color-button) hover:bg-(--color-button-hover) 
                       focus:ring-4 focus:outline-none focus:ring-(--color-button-focus) font-medium rounded-lg text-sm px-4 py-2"
              >
                Submit
              </button>
            </div>
          </form>
          <div className="mt-4 mb-2">
            
            {loadingPermissions
              ? "Loading..."
              : projectPermissions.map((p) => (
                  <div
                    key={p.id}
                    className="flex items-center justify-between mt-2"
                  >
                    <span className="text-sm font-medium text-(--color-font-primary)">
                      {p.email}
                    </span>

                    <select
                      className="border border-(--color-button) text-sm font-medium text-(--color-button) hover:text-(--color-button-font) hover:bg-(--color-button-hover) rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={p.role}
                      onChange={(e) => handleChangePermission(e, p.id)}
                    >
                      <option value="viewer">Viewer</option>
                      <option value="editor">Editor</option>
                    </select>

                    <button
                      type="button"
                      onClick={() => handleDeletePermission(p.id)}
                      className="text-(--color-button) hover:text-(--color-button-font) hover:bg-(--color-button-hover) px-4 py-2 rounded-lg"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
          </div>
        </div>
      </div>
    )
  );
}
