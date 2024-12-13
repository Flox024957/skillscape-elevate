interface ProfileInfoProps {
  label: string;
  value: string;
}

export const ProfileInfo = ({ label, value }: ProfileInfoProps) => {
  return (
    <div>
      <h3 className="font-medium">{label}</h3>
      <p className="text-muted-foreground">{value}</p>
    </div>
  );
};