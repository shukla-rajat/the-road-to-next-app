import { getAdminOrRedirect } from "@/features/membership/queries/get-admin-or-redirect";

export default async function AdminLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ organisationId: string }>;
}>) {
  const { organisationId: organizationId } = await params;

  await getAdminOrRedirect(organizationId);

  return <>{children}</>;
}