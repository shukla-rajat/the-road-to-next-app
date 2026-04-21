import { getAuth } from "@/features/auth/queries/get-auth";

import { getOrganizationsByUser } from "../queries/get-organizations-by-user";

const OrganizationList = async () => {
  const { user } = await getAuth();
  const organizations = await getOrganizationsByUser(user?.id);

  return (
    <div>
      {organizations.map((organization) => (
        <div key={organization.id}>
          <div>{organization.name}</div>
        </div>
      ))}
    </div>
  );
};

export { OrganizationList };
