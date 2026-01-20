import React, { useEffect, useState } from "react"

type RecipesData = {
  [dishName: string]: {
    [ingredient: string]: number
  }
}

type RecipesCardProps = {
  data: RecipesData
}

export const RecipesCard: React.FC<RecipesCardProps> = ({ data }) => {
  const [selectedDish, setSelectedDish] = useState<string | null>(null)

  const dishes = Object.keys(data)
  const selectedRecipe = selectedDish ? data[selectedDish] : null

  useEffect(() => {
    if (dishes.length > 0 && !selectedDish) {
      setSelectedDish(dishes[0])
    }
  }, [dishes, selectedDish])

  return (
    <div className="w-full text-gray-700">

      <div className="p-4 grid grid-cols-2 gap-6 bg-white rounded-md shadow-sm border border-gray-200 h-[420px]">
  
        {/* LEFT: Dish List */}
        <div className="h-full overflow-y-auto pr-2">
          <div className="text-lg font-semibold mb-3">Recipes</div>
          <div className="space-y-0">
            {dishes.map((dish) => (
              <button
                key={dish}
                onClick={() => setSelectedDish(dish)}
                className={`w-full flex items-center justify-between px-4 py-3 transition-all border-b
                  ${
                    selectedDish === dish
                      ? "border-gray-400 border-b-2 bg-[#6f2b8b] text-white"
                      : "border-gray-200 hover:bg-gray-200/20"
                  }`}
              >
                <span>{dish}</span>
              </button>
            ))}
          </div>
        </div>
  
        {/* RIGHT: Recipe Details */}
        <div className="h-full overflow-y-auto pr-2">
          <h3 className="text-lg font-semibold mb-3">Recipe Details</h3>
  
          {selectedRecipe ? (
            <div className="space-y-2">
              {Object.entries(selectedRecipe).map(([ingredient, qty]) => (
                <div
                  key={ingredient}
                  className="flex justify-between border-b border-gray-200 pb-1 text-sm"
                >
                  <span>{ingredient}</span>
                  <span>{qty}</span>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-sm text-gray-400">
              No recipe Found
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
