export default function VersionBadge() {
  // 1. Usamos a sintaxe correta do Next.js (process.env)
  // O slice(0, 7) que você trouxe é ótimo, uma forma mais moderna que o substring!
  const commitHash = process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA?.slice(0, 7) || 'dev';

  return (
    // 2. Mantive a sua estilização clean com o divisor ( · )
    <span className="text-[10px] text-gray-400 font-mono tracking-wider">
      v{commitHash}
    </span>
  );
}