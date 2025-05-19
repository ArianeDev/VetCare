import { createBrowserRouter } from 'react-router-dom';

import GlobalLayot from './Layout';
import { PageStart } from './Pages/PageStart';
import { Home } from './Pages/Home';
import { RegisterAnimal } from './Pages/RegisterAnimal';
import { ProtectedRoute } from './protectedRouter';

const router = createBrowserRouter([
	{
		path: "/",
		element: <PageStart />
	},
	{
		path: "/",
		element: <ProtectedRoute />,
		children: [
			{
				element: <GlobalLayot />,
				children: [
					{
						path: "/home",
						element: <Home />
					},
					{
						path: "/cadastrar",
						element: <RegisterAnimal />
					}
				]
			}
		]
	}
]);

export default router;
