export function ErrorPage({error}: { error: Error }) {
   return <>
      <h2>Error</h2>
      <code>{String(error)}</code>
   </>
}
